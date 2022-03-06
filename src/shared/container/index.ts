import { container } from "tsyringe";

import IGuestsRepository from "../../modules/guests/repositories/IGuestsRepository";
import GuestsRepository from "../../modules/guests/repositories/GuestRepository";

import BookingRepository from "../../modules/bookings/repositories/BookingRepository";
import IBookingRepository from "../../modules/bookings/repositories/IBookingRepository";

container.registerSingleton<IGuestsRepository>(
  "GuestsRepository",
  GuestsRepository
);

container.registerSingleton<IBookingRepository>(
  "BookingRepository",
  BookingRepository
);