import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
    setStatus: (state, action: PayloadAction<string>) => ({
      ...state,
      status: action.payload,
    }),
    clearQuery: state => ({
      ...state,
      query: '',
    }),
  },
});

export default filterSlice.reducer;
export const { setQuery, setStatus, clearQuery } = filterSlice.actions;
export const useFilter = () => {
  const query = useSelector((state: RootState) => state.filter.query);
  const status = useSelector((state: RootState) => state.filter.status);

  return { query, status };
};
