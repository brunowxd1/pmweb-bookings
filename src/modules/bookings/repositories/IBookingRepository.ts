import ICreateBookingDTO from "../dtos/ICreateBookingDTO";
import { IBooking } from "../entities/Booking";

export default interface IBookingRepository {
    create(data: ICreateBookingDTO): Promise<IBooking>;
    getAll(): Promise<IBooking[]>;
    findByGuest(guestId: string): Promise<IBooking[]>;
    findById(id: string): Promise<IBooking | null>;
    update(id: string, data: ICreateBookingDTO): Promise<IBooking | null>;
    delete(id: string): Promise<void>;
}