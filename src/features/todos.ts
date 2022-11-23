import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/SET';
  payload: Todo[];
};

type Action = SetTodos;

const set = (todos: Todo[]): SetTodos => ({
  type: 'todos/SET',
  payload: todos,
});

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;
      break;

    default:
      return todos;
      break;
  }
};

export const actions = { set };
export default todosReducer;
