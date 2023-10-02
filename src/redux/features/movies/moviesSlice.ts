import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface MoviesState {
  movies: {}[];
  favorites: {}[];
  searchTerm: string;
}

const initialState: MoviesState = {
  movies: [],
  favorites: [],
  searchTerm: '',
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = moviesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSearchTerm = (state: RootState) => state.movies.searchTerm;

export default moviesSlice.reducer;
