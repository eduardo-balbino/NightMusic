import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "musics ok" });
});

export default router;