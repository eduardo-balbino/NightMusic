import { Request, Response, NextFunction } from "express";
import {
  getUserById,
  InvalidCredentialsError,
  listUsers,
  listDisplayName,
  loginUser,
  LoginUserInput,
  registerUser,
  RegisterUserInput,
  UserAlreadyExistsError,
} from "../services/users.service.js";

function handleKnownUserError(
  error: unknown,
  res: Response,
  next: NextFunction,
) {
  if (
    error instanceof UserAlreadyExistsError ||
    error instanceof InvalidCredentialsError
  ) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  return next(error);
}

export async function registerUserController(
  req: Request<unknown, unknown, RegisterUserInput>,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      message: "User created",
      user,
    });
  } catch (error) {
    return handleKnownUserError(error, res, next);
  }
}

export async function loginUserController(
  req: Request<unknown, unknown, LoginUserInput>,
  res: Response,
  next: NextFunction,
) {
  try {
    const loginResult = await loginUser(req.body);

    return res.json({
      message: "Login successful",
      ...loginResult,
    });
  } catch (error) {
    return handleKnownUserError(error, res, next);
  }
}

export async function listUsersController(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await listUsers();

    return res.json({ users });
  } catch (error) {
    return next(error);
  }
}

export async function listDisplay_NameController(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const display_name = await listDisplayName(req.params.id);

    return res.json({ display_name });
  } catch (error) {
    return next(error);
  }
}

export async function getUserByIdController(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction, 
) {
  try {
    const user = await getUserById(req.params.id);

    return res.json({ user });
  } catch (error) {
    return next(error);
  }
}
