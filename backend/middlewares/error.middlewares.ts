import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = (err && err.statusCode) || 500;

  res.status(statusCode).json({
    error: err?.message || "Internal server error",
  });
}
