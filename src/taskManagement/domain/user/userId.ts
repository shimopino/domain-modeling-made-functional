import { err, ok, Result } from 'neverthrow';
import { Branded } from '../branded';

export type UserId = Branded<string, 'UserId'>;

export type TsakIdNonEmptyError = {
  type: 'UserIdNonEmptyError';
  id: string;
};

export const UserId = (userId: string): Result<UserId, TsakIdNonEmptyError> => {
  if (userId.length === 0) {
    return err({
      type: 'UserIdNonEmptyError',
      id: userId,
    });
  }

  return ok(userId as UserId);
};
