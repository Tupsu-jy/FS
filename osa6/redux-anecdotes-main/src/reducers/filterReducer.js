import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (state, action) => {
      return action.payload;
    },
    emptyFilter: () => {
      return '';
    },
  },
});

export const { setFilter, emptyFilter } = filterSlice.actions;

export default filterSlice.reducer;
