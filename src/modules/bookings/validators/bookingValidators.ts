import { celebrate, Segments, Joi } from "celebrate";
import { isValidObjectId } from "mongoose";

const checkObjectId = (value: string, helpers: any) => {
  if (!isValidObjectId(value)) {
    return helpers.error();
  }

  return value;
};

export const updateBookingValidator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().custom(checkObjectId).message("Invalid Booking Id"),
  },
  [Segments.BODY]: {
    hotel: Joi.string().max(50),
    room: Joi.number(),
    bookingValue: Joi.number(),
    stayInitialDate: Joi.date(),
    stayFinalDate: Joi.date(),
    status: Joi.string().valid("checkIn", "checkOut", "confirmed", "cancelled"),
    guest: Joi.string()
      .custom(checkObjectId)
      .message("Invalid Guest Id")
      .required(),
  },
});

export const createBookingValidator = celebrate({
  [Segments.BODY]: {
    hotel: Joi.string().max(50).required(),
    room: Joi.number().required(),
    bookingValue: Joi.number().required(),
    stayInitialDate: Joi.date().required(),
    stayFinalDate: Joi.date().required(),
    status: Joi.string()
      .valid("checkIn", "checkOut", "confirmed", "cancelled")
      .required(),
    guest: Joi.string()
      .custom(checkObjectId)
      .message("Invalid Guest Id")
      .required(),
  },
});

export const getOrDeleteOneBookingValidator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().custom(checkObjectId).message("Invalid Booking Id"),
  },
});
