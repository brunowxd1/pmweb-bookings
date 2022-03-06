import { inject, injectable } from "tsyringe";
import { IGuest } from "../entities/Guest";
import IGuestsRepository from "../repositories/IGuestsRepository";

@injectable()
class GetAllGuestsService {
  constructor(
    @inject("GuestsRepository")
    private guestsRepository: IGuestsRepository
  ) {}

  public async execute(): Promise<IGuest[]> {
    return await this.guestsRepository.getAll();
  }
}

export default GetAllGuestsService;
