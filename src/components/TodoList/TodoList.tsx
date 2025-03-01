/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useFilter } from '../../features/filter';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';
import { RootState } from '../../app/store';
import classNames from 'classnames';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const { query, status } = useFilter();
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch();

  const filteredTodos = todos.filter(todo => {
    const queryFilter = todo.title.toLowerCase().includes(query.toLowerCase());
    let statusFilter =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    return queryFilter && statusFilter;
  });

  function handleEyeClick(todo: Todo) {
    dispatch(setCurrentTodo(todo));
  }

  return (
    <>
      {filteredTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {filteredTodos.map(todo => (
            <tr
              data-cy="todo"
              key={todo.id}
              className={classNames({
                'has-background-info-light': currentTodo?.id === todo.id,
              })}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleEyeClick(todo)}
                >
                  <span className="icon">
                    <i
                      className={`far ${currentTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
