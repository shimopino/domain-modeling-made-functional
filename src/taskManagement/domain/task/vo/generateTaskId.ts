import { nanoid } from 'nanoid';
import { TaskId } from './taskId';

export const generateTaskId = (seed?: string) => {
  const generatedUUID = seed ?? nanoid();

  return TaskId(generatedUUID);
};
