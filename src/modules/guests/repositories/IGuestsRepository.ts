import ICreateGuestDTO from "../dtos/ICreateGuestDTO";
import { IGuest } from "../entities/Guest";

export default interface IGuestsRepository {
  create(data: ICreateGuestDTO): Promise<IGuest>;
  getAll(): Promise<IGuest[]>;
  findByEmail(email: string): Promise<IGuest | null>;
  findById(id: string): Promise<IGuest | null>;
  update(id: string, guest: ICreateGuestDTO): Promise<IGuest | null>;
  delete(id: string): Promise<void>;
}
