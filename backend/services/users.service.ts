import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config.database.js";

export type User = {
  user_id: string;
  email: string;
  display_name: string;
  created_at?: string;
};

type UserWithPassword = User & {
  password_hash: string;
};

export type RegisterUserInput = {
  email: string;
  password: string;
  displayName: string;
};

export type LoginUserInput = {
  email: string;
  password: string;
};

export type LoginUserResult = {
  token: string;
  user: {
    id: string;
    email: string;
    displayName: string;
  };
};

export class UserAlreadyExistsError extends Error {
  statusCode = 409;

  constructor() {
    super("User already exists");
  }
}

export class InvalidCredentialsError extends Error {
  statusCode = 400;

  constructor() {
    super("Invalid credentials");
  }
}

export class MissingJwtSecretError extends Error {
  statusCode = 500;

  constructor() {
    super("JWT_SECRET is not configured");
  }
}

export async function registerUser({
  email,
  password,
  displayName,
}: RegisterUserInput): Promise<User> {
  const userExists = await pool.query("SELECT 1 FROM users WHERE email = $1", [
    email,
  ]);

  if (userExists.rows.length > 0) {
    throw new UserAlreadyExistsError();
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const result = await pool.query<User>(
    `INSERT INTO users (email, display_name, password_hash)
     VALUES ($1, $2, $3)
     RETURNING user_id, email, display_name`,
    [email, displayName, passwordHash],
  );

  return result.rows[0];
}

export async function loginUser({
  email,
  password,
}: LoginUserInput): Promise<LoginUserResult> {
  const result = await pool.query<UserWithPassword>(
    "SELECT user_id, email, password_hash, display_name FROM users WHERE email = $1",
    [email],
  );

  const user = result.rows[0];

  if (!user) {
    throw new InvalidCredentialsError();
  }

  const isValidPassword = await bcrypt.compare(password, user.password_hash);

  if (!isValidPassword) {
    throw new InvalidCredentialsError();
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new MissingJwtSecretError();
  }

  const token = jwt.sign(
    {
      userId: user.user_id,
      email: user.email,
    },
    jwtSecret,
    {
      expiresIn: "1h",
    },
  );

  return {
    token,
    user: {
      id: user.user_id,
      email: user.email,
      displayName: user.display_name,
    },
  };
}

export async function listUsers(): Promise<User[]> {
  const result = await pool.query<User>(
    `SELECT user_id, email, display_name, created_at
     FROM users
     ORDER BY created_at DESC`,
  );

  return result.rows;
}

export async function getUserById(id: string): Promise<User | undefined> {
  const result = await pool.query<User>(
    `SELECT user_id, email, display_name, created_at
     FROM users
     WHERE user_id = $1`,
    [id],
  );

  return result.rows[0];
}
