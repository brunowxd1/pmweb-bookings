import { Mongoose } from "mongoose";
import Guest from "../modules/guests/entities/Guest";
import Booking from "../modules/bookings/entities/Booking";

import mongoDbProvider from "../shared/infra/database/MongoDbProvider";

let mongoDb: Mongoose | undefined;

export default function () {
  beforeAll(async () => {
    mongoDb = await mongoDbProvider.connect();
  });

  afterEach(async () => {
    if (!mongoDb) return;

    const collections = mongoDb.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  afterAll(async () => {
    if (!mongoDb) return;

    await mongoDb.connection.dropDatabase();
    await mongoDb.disconnect();
  });
}
