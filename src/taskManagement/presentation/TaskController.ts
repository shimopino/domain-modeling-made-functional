import { CreateTaskUseCase } from '../usecase/CreateTaskUseCase';

export type CreateTaskDto = {
  userId: string;
  name: string;
  dueDate: string;
};

export const TaskController = async (body: CreateTaskDto) => {
  const result = await CreateTaskUseCase({
    kind: 'UnvalidatedTask',
    name: body.name,
    userId: body.userId,
    dueDate: body.dueDate,
  });

  return result.match(
    (model) => model,
    (error) => {
      switch (error.type) {
        case 'UserIdNonEmptyError': {
          const userId = error.id;
          throw new Error(`UserId: [${userId}]は使用できません`);
        }
        case 'TsakIdNonEmptyError': {
          const taskId = error.id;
          throw new Error(`TaskId: [${taskId}]は使用できません`);
        }
        case 'NotISOFormatError': {
          const dueDate = error.from;
          throw new Error(`DueDate: [${dueDate}]はISO形式ではありません`);
        }
        case 'PastTimeSetError': {
          const dueDate = error.from.toString();
          throw new Error(`過去のDueDate: [${dueDate}]は指定できません`);
        }
        case 'ExceedMaximumDueDateError': {
          const dueDate = error.from.toString();
          throw new Error(
            `1週間よりも先のDueDate: [${dueDate}]を指定することはできません`,
          );
        }
        default:
          throw new Error();
      }
    },
  );
};
