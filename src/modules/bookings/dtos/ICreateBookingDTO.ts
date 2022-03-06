import { BookingStatus } from "../entities/Booking";

export default interface ICreateBookingDTO {
  hotel: string;
  room: number;
  bookingValue: number;
  stayInitialDate: string;
  stayFinalDate: string;
  guest: string;
  status: BookingStatus;
}
