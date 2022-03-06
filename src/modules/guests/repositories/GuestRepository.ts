import IGuestsRepository from "./IGuestsRepository";
import Guest, { IGuest } from "../entities/Guest";
import ICreateGuestDTO from "../dtos/ICreateGuestDTO";

class GuestsRepository implements IGuestsRepository {
  public async create(data: ICreateGuestDTO): Promise<IGuest> {
    return await Guest.create(data);
  }

  public async getAll(): Promise<IGuest[]> {
    return await Guest.find();
  }

  public async findByEmail(email: string): Promise<IGuest | null> {
    return await Guest.findOne({ email });
  }

  public async findById(id: string): Promise<IGuest | null> {
    return await Guest.findById(id);
  }

  public async update(id: string, guest: ICreateGuestDTO): Promise<IGuest | null> {
    return await Guest.findByIdAndUpdate(id, {...guest, updatedAt: Date.now()}, { new: true });
  }

  public async delete(id: string): Promise<void> {
    await Guest.findByIdAndDelete(id);
  }
}

export default GuestsRepository;
