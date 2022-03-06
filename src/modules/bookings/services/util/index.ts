import { isBefore, parseISO } from "date-fns";
import AppError from "../../../../shared/errors/AppError";

export const validateStay = (
  initialDate: string,
  finalDateString: string
): void => {
  const [initialParsedDate, finalParsedDate] = [
    initialDate,
    finalDateString,
  ].map((it) => new Date(it));

  const today = new Date();

  if (isBefore(initialParsedDate, today)) {
    throw new AppError("The initial date of stay must be after today");
  }

  if (isBefore(finalParsedDate, initialParsedDate)) {
    throw new AppError(
      "The final date of stay must be after the initial date of stay"
    );
  }
};
