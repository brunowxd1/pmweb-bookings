import IBookingRepository from "./IBookingRepository";
import Booking, { IBooking } from "../entities/Booking";
import ICreateBookingDTO from "../dtos/ICreateBookingDTO";

class BookingRepository implements IBookingRepository {
  public async create(data: ICreateBookingDTO): Promise<IBooking> {
    return await Booking.create(data);
  }

  public async getAll(): Promise<IBooking[]> {
    return await Booking.find();
  }

  public async findByGuest(guestId: string): Promise<IBooking[]> {
    return await Booking.find({ guest: guestId });
  }

  public async findById(id: string): Promise<IBooking | null> {
      return await Booking.findById(id);
  }

  public async update(id: string, data: ICreateBookingDTO): Promise<IBooking | null> {
      return await Booking.findByIdAndUpdate(id, {...data, updatedAt: Date.now()}, { new: true });
  }

  public async delete(id: string): Promise<void> {
      await Booking.findByIdAndDelete(id);
  }
}

export default BookingRepository;
