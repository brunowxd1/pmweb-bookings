import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import { IGuest } from "../entities/Guest";
import IGuestsRepository from "../repositories/IGuestsRepository";

@injectable()
class FindOneGuestService {
  constructor(
    @inject("GuestsRepository")
    private guestsRepository: IGuestsRepository
  ) {}

  public async execute(id: string): Promise<IGuest> {
    const guest = await this.guestsRepository.findById(id);

    if (!guest) {
      throw new AppError("Guest not found");
    }

    return guest;
  }
}

export default FindOneGuestService;
