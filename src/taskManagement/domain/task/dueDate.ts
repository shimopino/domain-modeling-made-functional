import { DateTime } from 'luxon';
import { err, Result } from 'neverthrow';
import { Branded } from '../branded';

export type DueDate = Branded<DateTime, 'DueDate'>;

export type NotISOFormatError = {
  type: 'NotISOFormatError';
  from: string;
};

export type PastTimeSetError = {
  type: 'PastTimeSetError';
  from: DateTime;
};

export type ExceedMaximumDueDateError = {
  type: 'ExceedMaximumDueDateError';
  from: DateTime;
};

type ValidationError =
  | NotISOFormatError
  | PastTimeSetError
  | ExceedMaximumDueDateError;

export const DueDate = (dueDate: string): Result<DueDate, ValidationError> => {
  const parseDueDate = DateTime.fromISO(dueDate);

  if (!parseDueDate.isValid) {
    return err({
      type: 'NotISOFormatError',
      from: dueDate,
    });
  }

  return DateTime.fromISO(dueDate);
};
