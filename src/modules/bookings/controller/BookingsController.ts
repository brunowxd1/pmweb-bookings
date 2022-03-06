import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateBookingService from "../services/CreateBookingService";
import UpdateBookingService from "../services/UpdateBookingService";
import FindAllBookingsService from "../services/FindAllBookingsService";
import FindOneBookingService from "../services/FindOneBookingService";
import DeleteBookingService from "../services/DeleteBookingService";
import FindBookingsByGuest from "../services/FindBookingsByGuest";

export default class BookingsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createBooking = container.resolve(CreateBookingService);

    const newBooking = await createBooking.execute(req.body);

    return res.json(newBooking);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const updateBooking = container.resolve(UpdateBookingService);

    const updatedBooking = await updateBooking.execute(id, req.body);

    return res.json(updatedBooking);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const findAllBookings = container.resolve(FindAllBookingsService);

    const bookings = await findAllBookings.execute();

    return res.json(bookings);
  }

  public async findOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findOneBooking = container.resolve(FindOneBookingService);

    const booking = await findOneBooking.execute(id);

    return res.json(booking);
  }

  public async findByGuest(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findBookingsByGuest = container.resolve(FindBookingsByGuest);

    const bookings = await findBookingsByGuest.execute(id);

    return res.json(bookings);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteBooking = container.resolve(DeleteBookingService);

    await deleteBooking.execute(id);

    return res.json({ message: "Booking deleted" });
  }
}
