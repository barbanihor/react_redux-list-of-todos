import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodosLoaded, setLoaded, setTodos } from './features/todos';
import { useEffect } from 'react';
import { AppDispatch } from './app/store';
import { selectCurrTodo } from './features/currentTodo';
import { getTodos } from './api';

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isTodoLoaded = useSelector(selectTodosLoaded);
  const selectedTodo = useSelector(selectCurrTodo);

  useEffect(() => {
    dispatch(setLoaded(false));

    const fetchTodos = async () => {
      try {
        const todos = await getTodos();
        dispatch(setTodos(todos));
      } finally {
        dispatch(setLoaded(true));
      }
    };
    fetchTodos();
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
              {isTodoLoaded ? <TodoList /> : <Loader />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal />}
    </>
  );
};
