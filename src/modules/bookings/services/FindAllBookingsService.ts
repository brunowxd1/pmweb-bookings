import { inject, injectable } from "tsyringe";
import IBookingRepository from "../repositories/IBookingRepository";
import { IBooking } from "../entities/Booking";

@injectable()
class FindAllBookingsService {
  constructor(
    @inject("BookingRepository")
    private bookingRepository: IBookingRepository
  ) {}

  public async execute(): Promise<IBooking[]> {
    return await this.bookingRepository.getAll();
  }
}

export default FindAllBookingsService;
