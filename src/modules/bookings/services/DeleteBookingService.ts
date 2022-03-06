import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import IBookingRepository from "../repositories/IBookingRepository";

@injectable()
class DeleteBookingService {
  constructor(
    @inject("BookingRepository")
    private bookingRepository: IBookingRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const booking = await this.bookingRepository.findById(id);

    if (!booking) {
      throw new AppError("Booking not found");
    }

    await this.bookingRepository.delete(id);
  }
}

export default DeleteBookingService;
