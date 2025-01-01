import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export function handleToDoErrorMessage(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.mapped() });
  }
  next();
}
