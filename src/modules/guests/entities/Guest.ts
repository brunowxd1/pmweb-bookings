import { model, Schema, Document } from "mongoose";

export interface IGuest extends Document {
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  city: string;
  state: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

const guestSchema = new Schema({
  name: {
    type: String,
    required: [true, "The guest must have a name"],
  },
  email: {
    type: String,
    required: [true, "The guest must have an email"],
    unique: true,
  },
  birthDate: {
    type: Date,
    required: [true, "The guest must have a birthday date"],
  },
  phone: {
    type: String,
    required: [true, "The guest must have a phone"],
  },
  city: {
    type: String,
    required: [true, "The guest must have a city"],
  },
  state: {
    type: String,
    required: [true, "The guest must have a state"],
  },
  country: {
    type: String,
    required: [true, "The guest must have a country"],
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

export default model<IGuest>("Guest", guestSchema);
