import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Movie } from '../../../types/Movie';

interface FavoritesState {
  favorites: Movie[];
}

const initialState: FavoritesState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavoriteMovie: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const isFavorite = state.favorites.some(
        (favoriteMovie) => favoriteMovie.imdbID === movie.imdbID
      );
      if (!isFavorite) {
        state.favorites.push(movie);
      } else {
        state.favorites = state.favorites.filter(
          (favoriteMovie) => favoriteMovie.imdbID !== movie.imdbID
        );
      }
    },
  },
});

export const { toggleFavoriteMovie } = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites.favorites;

export default favoritesSlice.reducer;
