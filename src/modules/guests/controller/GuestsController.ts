import { Request, Response } from "express";

import { container } from "tsyringe";
import CreateGuestService from "../services/CreateGuestService";
import DeleteGuestService from "../services/DeleteGuestService";
import FindOneGuestService from "../services/FindOneGuestService";
import FindAllGuestsService from "../services/GetAllGuestsService";
import UpdateGuestService from "../services/UpdateGuestService";

export default class GuestsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createGuest = container.resolve(CreateGuestService);

    const guest = await createGuest.execute(req.body);

    return res.json(guest);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const getGuests = container.resolve(FindAllGuestsService);

    const allGuests = await getGuests.execute();

    return res.json(allGuests);
  }

  public async getOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getOneGuest = container.resolve(FindOneGuestService);

    const guest = await getOneGuest.execute(id);

    return res.json(guest);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updateGuest = container.resolve(UpdateGuestService);

    const guest = await updateGuest.execute(id, req.body);

    return res.json(guest);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await container.resolve(DeleteGuestService).execute(id);

    return res.json({ message: "Guest deleted" });
  }
}
