import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { setTodos } from './features/todos';

export const App = () => {
  const dispatch = useDispatch();
  const todosFromServer = useSelector((state: RootState) => state.todos);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(resp => dispatch(setTodos(resp)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading ? <Loader /> : <TodoList todos={todosFromServer} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
