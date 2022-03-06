import { Router } from "express";

import GuestsController from "../controller/GuestsController";
import { createGuestValidator, getOrDeleteOneGuestValidator, updateGuestValidor } from "../validators/guestsValidators";

const guestsRouter = Router();
const guestsController = new GuestsController();

guestsRouter.get("/", guestsController.getAll);
guestsRouter.post("/", createGuestValidator, guestsController.create);

guestsRouter.get("/:id", getOrDeleteOneGuestValidator, guestsController.getOne);
guestsRouter.put("/:id", updateGuestValidor, guestsController.update);
guestsRouter.delete("/:id", getOrDeleteOneGuestValidator, guestsController.delete);

export default guestsRouter;
