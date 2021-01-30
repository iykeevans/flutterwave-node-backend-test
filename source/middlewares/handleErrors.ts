import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    return res.status(400).json({
      status: "error",
      message: `${err.message}.`,
      data: null,
    });
  }

  return res.status(500).json({
    status: "error",
    message: err.message,
  });
};
