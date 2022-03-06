import app from "./app";
import mongoDbProvider from "../database/MongoDbProvider";

mongoDbProvider.connect().then((db) => db);

const port = process.env.PORT || 3333;

app.listen(3333, () => {
  console.log(`Server started on port ${port}`);
});
