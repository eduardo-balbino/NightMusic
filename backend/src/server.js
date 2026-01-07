import express from "express";
import "dotenv/config";
import musicRouter from "./routes/musics.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/musics", musicRouter);

app.get("/health", (req, res) => {
  res.status(200).send("ok");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
