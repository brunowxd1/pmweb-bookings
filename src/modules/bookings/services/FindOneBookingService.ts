import { inject, injectable } from "tsyringe";
import IBookingRepository from "../repositories/IBookingRepository";
import { IBooking } from "../entities/Booking";
import AppError from "../../../shared/errors/AppError";

@injectable()
class FindOneBookingService {
  constructor(
    @inject("BookingRepository")
    private bookingRepository: IBookingRepository
  ) {}

  public async execute(id: string): Promise<IBooking> {
    const booking = await this.bookingRepository.findById(id);

    if (!booking) {
      throw new AppError("Booking not found");
    }

    await booking.populate("guest");

    return booking;
  }
}

export default FindOneBookingService;
