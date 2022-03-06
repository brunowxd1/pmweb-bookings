import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import IGuestsRepository from "../../guests/repositories/IGuestsRepository";
import ICreateBookingDTO from "../dtos/ICreateBookingDTO";
import { IBooking } from "../entities/Booking";
import IBookingRepository from "../repositories/IBookingRepository";
import { validateStay } from "./util/index";

@injectable()
class CreateBookingService {
  constructor(
    @inject("BookingRepository")
    private bookingRepository: IBookingRepository,
    @inject("GuestsRepository")
    private guestsRepository: IGuestsRepository
  ) {}

  public async execute(data: ICreateBookingDTO): Promise<IBooking> {
    const { guest: guestId } = data;

    const guest = await this.guestsRepository.findById(guestId);

    if (!guest) throw new AppError("Guest not found");

    validateStay(data.stayInitialDate, data.stayFinalDate);

    const newBooking = await this.bookingRepository.create(data);

    await newBooking.save();

    return newBooking;
  }
}

export default CreateBookingService;
