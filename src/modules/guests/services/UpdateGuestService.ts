import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import ICreateGuestDTO from "../dtos/ICreateGuestDTO";
import { IGuest } from "../entities/Guest";
import IGuestsRepository from "../repositories/IGuestsRepository";

@injectable()
class UpdateGuestService {
  constructor(
    @inject("GuestsRepository")
    private guestsRepository: IGuestsRepository
  ) {}

  public async execute(id: string, data: ICreateGuestDTO): Promise<IGuest> {
    const updatedGuest = await this.guestsRepository.update(id, data);

    if (!updatedGuest) {
      throw new AppError("Guest not found");
    }

    return updatedGuest;
  }
}

export default UpdateGuestService;
