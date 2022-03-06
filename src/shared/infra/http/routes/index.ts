import { Router } from "express";

import guestsRouter from "../../../../modules/guests/routes/guests.routes";
import bookingsRouter from "../../../../modules/bookings/routes/bookings.routes";

const routes = Router();

routes.use("/guests", guestsRouter);
routes.use("/bookings", bookingsRouter);

export default routes;
