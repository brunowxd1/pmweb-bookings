import { inject, injectable } from "tsyringe";
import IBookingRepository from "../repositories/IBookingRepository";
import { IBooking } from "../entities/Booking";
import AppError from "../../../shared/errors/AppError";
import IGuestsRepository from "../../guests/repositories/IGuestsRepository";

@injectable()
class FindBookingsByGuest {
  constructor(
    @inject("BookingRepository")
    private bookingRepository: IBookingRepository,
    @inject("GuestsRepository")
    private guestRepository: IGuestsRepository
  ) {}

  public async execute(guestId: string): Promise<IBooking[]> {
    const guest = await this.guestRepository.findById(guestId);

    if (!guest) {
      throw new AppError("Guest not found");
    }

    const booking = await this.bookingRepository.findByGuest(guestId);

    return booking;
  }
}

export default FindBookingsByGuest;
