import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedBook: null,
};

const bookSelectedSlice = createSlice({
  name: 'bookSelected',
  initialState,
  reducers: {
    setSelectedBook(state, action) {
      state.selectedBook = action.payload;
    },
    clearSelectedBook(state) {
      state.selectedBook = null;
    },
  },
});

export const { setSelectedBook, clearSelectedBook } = bookSelectedSlice.actions;
export default bookSelectedSlice.reducer;
