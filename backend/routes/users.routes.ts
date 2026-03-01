import { Router, Request, Response, NextFunction } from "express";
import { pool } from "../config.database.js";

type CreateUserBody = {
  email?: string;
  displayName?: string;
};

const router = Router();

router.post(
  "/",
  async (
    req: Request<unknown, unknown, CreateUserBody>,
    res: Response,
    next: NextFunction,
  ) => {
    const { email, displayName } = req.body;

    if (!email || !displayName) {
      return res.status(400).json({
        message: "email and displayName are required",
      });
    }

    try {
      const result = await pool.query<{
        user_id: string;
        email: string;
        display_name: string;
        created_at: string;
      }>(
        `
          INSERT INTO users (email, display_name)
          VALUES ($1, $2)
          RETURNING user_id, email, display_name, created_at
        `,
        [email, displayName],
      );

      return res.status(201).json({
        user: result.rows[0],
      });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "23505"
      ) {
        return res.status(409).json({
          message: "email already exists",
        });
      }

      return next(error);
    }
  },
);

export default router;
