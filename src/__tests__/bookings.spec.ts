import request from "supertest";
import app from "../shared/infra/http/app";
import init from "./init";
import { guestObj, secondGuestObj } from "./guests.spec";

const bookingObj = {
  hotel: "Hotel 1",
  room: 312,
  bookingValue: 1000,
  stayInitialDate: "2023-03-03",
  stayFinalDate: "2023-03-04",
  status: "confirmed",
};

const secondBookingObj = {
  hotel: "Hotel 2",
  room: 153,
  bookingValue: 1000,
  stayInitialDate: "2023-03-04",
  stayFinalDate: "2023-03-04",
  status: "confirmed",
};

describe("Bookings", () => {
  init();

  it("should be able to create a new booking", async () => {
    const guest = await request(app).post("/api/v1/guests").send(guestObj);

    const response = await request(app)
      .post("/api/v1/bookings")
      .send({ ...bookingObj, guest: guest.body._id });

    expect(response.body).toHaveProperty("_id");
  });

  it("should not be able to create a new booking with a non-existing guest", async () => {
    const response = await request(app)
      .post("/api/v1/bookings")
      .send({ ...bookingObj, guest: "622062a13866c670290a57b4" });

    expect(response.status).toBe(400);
  });

  it("should not be able to create a new booking with an invalid initial stay date", async () => {
    const guest = await request(app).post("/api/v1/guests").send(guestObj);

    const response = await request(app)
      .post("/api/v1/bookings")
      .send({
        ...bookingObj,
        guest: guest.body._id,
        stayInitialDate: "2022-03-02",
      });

    expect(response.status).toBe(400);
  });

  it("should not be able to create a new booking with an invalid initial stay date", async () => {
    const guest = await request(app).post("/api/v1/guests").send(guestObj);

    const response = await request(app)
      .post("/api/v1/bookings")
      .send({
        ...bookingObj,
        guest: guest.body._id,
        stayFinalDate: "2022-03-02",
      });

    expect(response.status).toBe(400);
  });

  it("should be able to list all bookings", async () => {
    const guest = await request(app).post("/api/v1/guests").send(guestObj);

    const booking1 = await request(app)
      .post("/api/v1/bookings")
      .send({ ...bookingObj, guest: guest.body._id });

    const booking2 = await request(app)
      .post("/api/v1/bookings")
      .send({ ...secondBookingObj, guest: guest.body._id });

    const response = await request(app).get("/api/v1/bookings");

    expect(response.body).toEqual(
      expect.arrayContaining([
        { ...booking1.body, guest: guest.body._id },
        { ...booking2.body, guest: guest.body._id },
      ])
    );
  });

  it("should be able to find one booking by id", async () => {
    const guest = await request(app).post("/api/v1/guests").send(guestObj);

    const booking = await request(app)
      .post("/api/v1/bookings")
      .send({ ...bookingObj, guest: guest.body._id });

    const response = await request(app).get(
      `/api/v1/bookings/${booking.body._id}`
    );

    expect(response.body).toEqual({ ...booking.body, guest: guest.body });
  });

  it("should not be able to find a non-existing booking", async () => {
    const response = await request(app).get(
      "/api/v1/bookings/622062a13866c670290a57b4"
    );

    expect(response.status).toBe(400);
  });

  it("should be able to find bookings by guest id", async () => {
    const firstGuest = await request(app).post("/api/v1/guests").send(guestObj);
    const secondGuest = await request(app)
      .post("/api/v1/guests")
      .send(secondGuestObj);

    const firstBooking = await request(app)
      .post("/api/v1/bookings")
      .send({ ...bookingObj, guest: firstGuest.body._id });

    await request(app)
      .post("/api/v1/bookings")
      .send({ ...secondBookingObj, guest: secondGuest.body._id });

    const response = await request(app).get(
      `/api/v1/bookings/guest/${firstGuest.body._id}`
    );

    expect(response.body).toEqual(
      expect.arrayContaining([
        { ...firstBooking.body, guest: firstGuest.body._id },
      ])
    );
  });

  it("should not be able to find bookings by a non-existing guest", async () => {
    const response = await request(app).get(
      `/api/v1/bookings/guest/622062a13866c670290a57b4`
    );

    expect(response.status).toBe(400);
  });

  it("should be able to delete a booking", async () => {
    const guest = await request(app).post("/api/v1/guests").send(guestObj);

    const booking = await request(app)
      .post("/api/v1/bookings")
      .send({ ...bookingObj, guest: guest.body._id });

    const response = await request(app).delete(
      `/api/v1/bookings/${booking.body._id}`
    );

    expect(response.status).toBe(200);
  });

  it("should not be able to delete a non-existing booking", async () => {
    const response = await request(app).delete(
      "/api/v1/bookings/622062a13866c670290a57b4"
    );

    expect(response.status).toBe(400);
  });

  it("should be able to update a booking", async () => {
    const guest = await request(app).post("/api/v1/guests").send(guestObj);

    const booking = await request(app)
      .post("/api/v1/bookings")
      .send({ ...bookingObj, guest: guest.body._id });

    const updatedBookingObj = {
      ...bookingObj,
      hotel: "Updated Hotel",
      bookingValue: 1500,
      guest: guest.body._id,
      stayInitialDate: booking.body.stayInitialDate,
      stayFinalDate: booking.body.stayFinalDate,
    };

    const response = await request(app)
      .put(`/api/v1/bookings/${booking.body._id}`)
      .send(updatedBookingObj);

    expect(response.body).toMatchObject(updatedBookingObj);
  });

  it("should not be able to update a booking with a non-existing user", async () => {
    const guest = await request(app).post("/api/v1/guests").send(guestObj);

    const booking = await request(app)
      .post("/api/v1/bookings")
      .send({ ...bookingObj, guest: guest.body._id });

    const response = await request(app)
      .put("/api/v1/bookings/622062a13866c670290a57b4")
      .send(booking.body);

    expect(response.status).toBe(400);
  });

  it("should not be able to update a non-existing booking", async () => {
    const guest = await request(app).post("/api/v1/guests").send(guestObj);

    const response = await request(app)
      .put("/api/v1/bookings/622062a13866c670290a57b4")
      .send({ ...bookingObj, guest: guest.body._id });

    expect(response.status).toBe(400);
  });

  it("should be able to reject invalid booking id", async () => {
    const response = await request(app).get("/api/v1/bookings/invalid-id");

    expect(response.status).toBe(400);
  });
});
