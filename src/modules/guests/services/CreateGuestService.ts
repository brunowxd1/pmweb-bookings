import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import ICreateGuestDTO from "../dtos/ICreateGuestDTO";
import { IGuest } from "../entities/Guest";
import IGuestsRepository from "../repositories/IGuestsRepository";

@injectable()
class CreateGuestService {
  constructor(
    @inject("GuestsRepository")
    private guestsRepository: IGuestsRepository
  ) {}

  public async execute(data: ICreateGuestDTO): Promise<IGuest> {
    const guest = await this.guestsRepository.findByEmail(data.email);

    if (guest) {
      throw new AppError("Guest already exists", 400);
    }

    const newGuest = await this.guestsRepository.create(data);

    newGuest.save();

    return newGuest;
  }
}

export default CreateGuestService;
