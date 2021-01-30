import schema from "./schema";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    // regex to remove double quotes added by joi library
    const errorMessage = error.message.replace(/"([^"]+(?="))"/g, "$1");
    next(new Error(errorMessage));
  } else {
    next();
  }
};
