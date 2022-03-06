import { Router } from "express";

import BookingsController from "../controller/BookingsController";
import { updateBookingValidator, createBookingValidator, getOrDeleteOneBookingValidator} from "../validators/bookingValidators";

const bookingsRouter = Router();
const bookingsController = new BookingsController();

bookingsRouter.post("/", createBookingValidator, bookingsController.create);
bookingsRouter.get("/", bookingsController.getAll);

bookingsRouter.get("/:id", getOrDeleteOneBookingValidator, bookingsController.findOne);
bookingsRouter.put("/:id", updateBookingValidator, bookingsController.update);
bookingsRouter.delete("/:id", getOrDeleteOneBookingValidator, bookingsController.delete);

bookingsRouter.get("/guest/:id", bookingsController.findByGuest);

export default bookingsRouter;
