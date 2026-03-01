import express from "express";
import "dotenv/config";
import musicRouter from "./routes/musics.routes.js";
import usersRouter from "./routes/users.routes.js";
import { checkDatabaseConnection } from "./config.database.js";
import { logger } from "./middlewares/logger.middlewares.js";
import { errorHandler } from "./middlewares/error.middlewares.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(logger);

app.use(express.json());
app.use("/musics", musicRouter);
app.use("/users", usersRouter);

app.get("/health", (_req, res) => {
  res.status(200).send("ok");
});

app.get("/api/error-test", (_req, _res) => {
  throw new Error("Test error");
});

app.use(errorHandler);

async function startServer(): Promise<void> {
  await checkDatabaseConnection();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
