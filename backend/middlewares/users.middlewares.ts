import { Request, Response, NextFunction } from "express";

type RequestBody = Record<string, unknown>;

function hasStringField(body: RequestBody, field: string): boolean {
  return typeof body[field] === "string" && body[field].trim().length > 0;
}

export function validateRegisterUser(
  req: Request<unknown, unknown, RequestBody>,
  res: Response,
  next: NextFunction,
) {
  const requiredFields = ["email", "password", "displayName"];
  const hasAllFields = requiredFields.every((field) =>
    hasStringField(req.body, field),
  );

  if (!hasAllFields) {
    return res.status(400).json({
      message: "email, password and displayName are required",
    });
  }

  return next();
}

export function validateLoginUser(
  req: Request<unknown, unknown, RequestBody>,
  res: Response,
  next: NextFunction,
) {
  if (
    !hasStringField(req.body, "email") ||
    !hasStringField(req.body, "password")
  ) {
    return res.status(400).json({
      message: "email and password are required",
    });
  }

  return next();
}
