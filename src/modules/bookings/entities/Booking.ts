import { model, Schema, Document } from "mongoose";
import { IGuest } from "../../guests/entities/Guest";

export enum BookingStatus {
  checkIn = "checkIn",
  checkOut = "checkOut",
  confirmed = "confirmed",
  cancelled = "cancelled",
}

export interface IBooking extends Document {
  hotel: string;
  room: number;
  bookingValue: number;
  bookingDate: Date;
  stayInitialDate: Date;
  stayFinalDate: Date;
  status: BookingStatus;
  guest: IGuest;
}

const bookingSchema = new Schema({
  hotel: {
    type: String,
    required: [true, "The booking must be associated to a hotel"],
  },
  room: {
    type: Number,
    required: [true, "The booking must be associated to a hotel room"],
  },
  bookingValue: {
    type: Number,
    required: [true, "The booking must have a value"],
  },
  bookingDate: {
    type: Number,
    required: [true, "The booking must have a date"],
    default: Date.now(),
  },
  stayInitialDate: {
    type: Date,
    required: [true, "The booking must have a initial date of stay"],
  },
  stayFinalDate: {
    type: Date,
    required: [true, "The booking must have a final date of stay"],
  },
  status: {
    type: String,
    enum: BookingStatus,
    required: [true, "The booking must have a status"],
    default: BookingStatus.confirmed,
  },
  guest: {
    type: Schema.Types.ObjectId,
    ref: "Guest",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

bookingSchema.post("save", (booking) => {
  booking.populate("guest");
});

export default model<IBooking>("Booking", bookingSchema);
