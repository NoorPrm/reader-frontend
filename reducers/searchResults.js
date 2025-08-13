import { createSlice } from '@reduxjs/toolkit';

const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState: {
    books: [],
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.books = action.payload;
    },
    clearSearchResults: (state) => {
      state.books = [];
    },
  },
});

export const { setSearchResults, clearSearchResults } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;