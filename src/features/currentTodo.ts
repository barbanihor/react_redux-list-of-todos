import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action) => action.payload,
    clearCurrentTodo: () => null,
  },
});

export default currentTodoSlice.reducer;
export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
