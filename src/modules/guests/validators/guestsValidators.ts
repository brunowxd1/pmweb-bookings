import { celebrate, Segments, Joi } from "celebrate";
import { isValidObjectId } from "mongoose";

const checkObjectId = (value: string, helpers: any) => {
  if (!isValidObjectId(value)) {
    return helpers.error();
  }

  return value;
};

export const createGuestValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .regex(/([0-9]{2,3})?([0-9]{2})([0-9]{4,5})([0-9]{4})/)
      .required(),
    birthDate: Joi.date().required(),
    city: Joi.string().max(40).required(),
    state: Joi.string().max(2).required(),
    country: Joi.string().max(40).required(),
  },
});

export const updateGuestValidor = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().custom(checkObjectId).message("Invalid Guest Id"),
  },
  [Segments.BODY]: {
    name: Joi.string().max(100),
    email: Joi.string().email(),
    phone: Joi.string().regex(/([0-9]{2,3})?([0-9]{2})([0-9]{4,5})([0-9]{4})/),
    birthDate: Joi.date(),
    city: Joi.string().max(40),
    state: Joi.string().max(2),
    country: Joi.string().max(40),
  },
});

export const getOrDeleteOneGuestValidator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().custom(checkObjectId).message("Invalid Guest Id"),
  },
});
