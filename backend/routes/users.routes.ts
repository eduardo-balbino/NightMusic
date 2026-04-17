import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config.database.js";
import { error } from "console";

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

router.get(
  "/",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await pool.query<{
        user_id: string;
        email: string;
        display_name: string;
        created_at: string;
      }>(
        `
        SELECT user_id, email, display_name, created_at
        FROM users
        ORDER BY created_at DESC
        `
      );

      return res.json({
        users: result.rows,
      });

    } catch (error) {
      return next(error);
    }
  }
);

router.get(
  "/:id",
  async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    try {
      const result = await pool.query<{
        user_id: string;
        email: string;
        display_name: string;
        created_at: string;
      }>(
        `
        SELECT user_id, email, display_name, created_at
        FROM users
        WHERE user_id = $1
        `,
        [id]
      );

      return res.json({
        user: result.rows[0],
      });

    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  "/auth/login",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;

      const result = await pool.query<{
        user_id: string;
        email: string;
        password_hash: string;
        display_name: string;
      }>(
        "SELECT user_id, email, password_hash, display_name FROM users WHERE email = $1",
        [email]
      )

      const user = result.rows[0];

      const isValidPassword = await bcrypt.compare(
        password,
        user.password_hash
      );

      const token = jwt.sign(
        {
          userId: user.user_id,
          email: user.email
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h"
        }
      );

      if (!email || !password) {
        return res.status(400).json({
          message: "email or password is invalid"
        });
      }

      if (email === "dev") {
        return res.status(400).json({
          message: "bro do you kindding me"
        })
      };

      if (result.rows.length === 0) {
        return res.status(400).json({
          message: "Invalid credentials"
        })
      }

      return res.json({
        message: "Login sucessful",
        token,
        user: {
          id: user.user_id,
          email: user.email,
          displayName: user.display_name
        }
      });

    } catch {
      console.error("Login error:", error);
      return res.status(500).json({
        message: "internal server error"
      });
    }
  });


export default router;