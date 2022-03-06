import { injectable, inject } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import IGuestsRepository from "../../guests/repositories/IGuestsRepository";
import ICreateBookingDTO from "../dtos/ICreateBookingDTO";
import IBookingRepository from "../repositories/IBookingRepository";
import { validateStay } from "./util/index";

@injectable()
class UpdateBookingService {
  constructor(
    @inject("BookingRepository")
    private bookingRepository: IBookingRepository,
    @inject("GuestsRepository")
    private guestsRepository: IGuestsRepository
  ) {}

  public async execute(id: string, data: ICreateBookingDTO): Promise<any> {
    const guest = await this.guestsRepository.findById(data.guest);

    if (!guest) throw new AppError("Guest not found");

    validateStay(data.stayInitialDate, data.stayFinalDate);

    const updatedBooking = await this.bookingRepository.update(id, data);

    if (!updatedBooking) throw new AppError("Booking not found");

    updatedBooking.populate("guest");

    return updatedBooking;
  }
}

export default UpdateBookingService;
