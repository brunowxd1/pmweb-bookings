import request from "supertest";
import app from "../shared/infra/http/app";
import init from "./init";

export const guestObj = {
  name: "John Doe",
  email: "johndoe@gmail.com",
  phone: "55999999999",
  birthDate: "1996-10-27",
  city: "Gramado",
  state: "RS",
  country: "Brazil",
};

export const secondGuestObj = {
  name: "Jane Doe",
  email: "janedoe@gmail.com",
  phone: "55888888888",
  birthDate: "01-05-1995",
  city: "Gramado",
  state: "RS",
  country: "Brazil",
};

describe("Guests", () => {
  init();

  it("should be able to create a new guest", async () => {
    const response = await request(app).post("/api/v1/guests").send(guestObj);

    expect(response.body).toHaveProperty("_id");
  });

  it("should not be able to create a new guest with same email from another", async () => {
    await request(app).post("/api/v1/guests").send(guestObj);

    const response = await request(app).post("/api/v1/guests").send(guestObj);

    expect(response.status).toBe(400);
  });

  it("should be able to list all guests", async () => {
    const firstGuest = await request(app).post("/api/v1/guests").send(guestObj);

    const secondGuest = await request(app)
      .post("/api/v1/guests")
      .send(secondGuestObj);

    const response = await request(app).get("/api/v1/guests");

    expect(response.body).toEqual(
      expect.arrayContaining([firstGuest.body, secondGuest.body])
    );
  });

  it("should be able to find a guest by id", async () => {
    const guest = await request(app).post("/api/v1/guests").send(guestObj);

    const response = await request(app).get(`/api/v1/guests/${guest.body._id}`);

    expect(response.body).toEqual(guest.body);
  });

  it("should not be able to find a non-existing guest", async () => {
    const response = await request(app).get(
      `/api/v1/guests/621d65f03ccd8821bfa98cbf`
    );

    expect(response.status).toBe(400);
  });

  it("should be able to delete a guest", async () => {
    const guest = await request(app).post("/api/v1/guests").send(guestObj);

    const response = await request(app).delete(
      `/api/v1/guests/${guest.body._id}`
    );

    expect(response.status).toBe(200);
  });

  it("should not be able to delete an non-existing guest", async () => {
    const response = await request(app).delete(
      `/api/v1/guests/621d65f03ccd8821bfa98cbf`
    );

    expect(response.status).toBe(400);
  });

  it("should be able to update an guest", async () => {
    const guest = await request(app).post("/api/v1/guests").send(guestObj);

    const updatedGuest = {
      ...guestObj,
      name: "John Doe Jr.",
      email: "johndoejr@gmail.com",
      birthDate: "1996-10-27T00:00:00.000Z",
    };

    const response = await request(app)
      .put(`/api/v1/guests/${guest.body._id}`)
      .send(updatedGuest);

    expect(response.body).toMatchObject(updatedGuest);
  });

  it("should not be able to update a non-existing guest", async () => {
    await expect(
      (
        await request(app).put(`/api/v1/guests/621d65f03ccd8821bfa98cbf`)
      ).status
    ).toBe(400);
  });

  it("should be able to reject invalid guest id", async () => {
    const response = await request(app).get(`/api/v1/guests/invalid-id`);

    expect(response.status).toBe(400);
  });
});
