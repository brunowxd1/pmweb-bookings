import { Request, Response, NextFunction } from "express";
import { isCelebrateError } from "celebrate";
import AppError from "../../../errors/AppError";

export default (
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction
) => {
  if (isCelebrateError(err)) {
    const bodyErrors = err.details.get("body");
    const paramErrors = err.details.get("params");

    let errors: string[] = [];

    if (bodyErrors) {
      errors = bodyErrors.details.map((it) => it.message);
    }

    if (paramErrors) {
      errors = [...errors, ...paramErrors.details.map((it) => it.message)];
    }

    return response.status(400).json({
      status: "error",
      message: `Validation Failed. Motives: ${errors?.map(
        (error) => `${error}, `
      )}`.replace(/,(?=[^,]*$)/, "."),
    });
  }

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
