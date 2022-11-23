/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, filterBy } = useAppSelector(state => state.filter);

  const visibleTodos: Todo[] = useMemo(() => {
    let tempTodos = todos;

    switch (filterBy) {
      case 'active':
        tempTodos = tempTodos.filter((todo) => !todo.completed);
        break;
      case 'completed':
        tempTodos = tempTodos.filter((todo) => todo.completed);
        break;
      default:
        break;
    }

    if (query.length !== 0) {
      tempTodos = tempTodos.filter((todo) => todo.title.toLocaleLowerCase().includes(query));
    }

    return tempTodos;
  }, [todos, query, filterBy]);

  const handleSelectTodo = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));

  if (visibleTodos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
    <>
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {visibleTodos.map((todo) => {
            const {
              id,
              title,
              completed,
            } = todo;

            return (
              <tr
                data-cy="todo"
                className={classNames(currentTodo?.id === id
                  && 'has-background-info-light')}
                key={id}
              >
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames(`has-text-${completed ? 'success' : 'danger'}`)}
                  >
                    {title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleSelectTodo(todo)}
                  >
                    <span className="icon">
                      <i className={classNames('far fa-eye',
                        { 'fa-eye-slash': currentTodo?.id === id })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
