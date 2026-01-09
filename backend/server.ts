import express from "express";
import "dotenv/config";
import musicRouter from "./routes/musics.routes";
import { logger } from "./middlewares/logger.middlewares";
import { errorHandler } from "./middlewares/error.middlewares";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(logger);

app.use(express.json());
app.use("/musics", musicRouter);

app.get("/health", (_req, res) => {
  res.status(200).send("ok");
});

app.get("/api/error-test", (_req, _res) => {
  throw new Error("Test error");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
