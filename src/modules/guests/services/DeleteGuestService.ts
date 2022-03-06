import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import IGuestsRepository from "../repositories/IGuestsRepository";

@injectable()
class DeleteGuestService {
  constructor(
    @inject("GuestsRepository")
    private guestsRepository: IGuestsRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const guest = await this.guestsRepository.findById(id);

    if (!guest) {
      throw new AppError("Guest not found");
    }

    await this.guestsRepository.delete(id);
  }
}

export default DeleteGuestService;
