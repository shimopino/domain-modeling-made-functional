import { CreatedTask } from './task.type';

export type saveTaskFn = (model: CreatedTask) => Promise<void>;
