import express from "express";
import morgan from "morgan";
import connectDb from "./db.mjs";
import dotenv from "dotenv";
import blogRouter from "./routes/blogRoute.mjs";

dotenv.config();
connectDb();

const app = express();
app.use(express.json());
app.use(morgan("tiny"));

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

app.use("/", blogRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
