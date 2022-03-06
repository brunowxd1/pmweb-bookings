import mongoose from "mongoose";

class MongoDBProvider {
  private dbPath =
    process.env.NODE_ENV === "test"
      ? "mongodb://localhost:27017/pmwebTests"
      : "mongodb://localhost:27017/pmweb";

  connect = async () => {
    try {
      const db = await mongoose.connect(this.dbPath);
      console.log("MongoDB connected");
      return db;
    } catch (error) {
      console.log(
        `Não foi possível conectar ao banco de dados. Motivo: \n${error}`
      );
    }
  };
}

export default new MongoDBProvider();
