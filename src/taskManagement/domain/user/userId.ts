import { err, ok, Result } from 'neverthrow';
import { Branded } from '../branded';

export type UserId = Branded<string, 'UserId'>;

export type UserIdNonEmptyError = {
  type: 'UserIdNonEmptyError';
  id: string;
};

export const UserId = (userId: string): Result<UserId, UserIdNonEmptyError> => {
  if (userId.length === 0) {
    return err({
      type: 'UserIdNonEmptyError',
      id: userId,
    });
  }

  return ok(userId as UserId);
};
