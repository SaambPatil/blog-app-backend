import express from "express";
import { v4 as uuidv4 } from "uuid";
import blogRouter from "./routes/blogRoute.mjs";

const app = express();
app.use(express.json());

app.use("/", blogRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
