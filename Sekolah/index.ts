import express,{ Application } from "express";
import db from "./src/config/database.ts"
import { sekolahRouter } from "./src/routes/router.ts";

const PORT = 8000;
const app: Application = express();
app.use(express.json());
app.use("/school" , sekolahRouter)
db.getConnection((err, connection) => {
  if (err) {
    return console.log(err);
  }
  console.log("Connected to the database", connection.threadId);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
