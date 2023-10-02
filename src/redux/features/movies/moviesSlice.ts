import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Movie } from '../../../types/Movie';

interface MoviesState {
  movies: {
    data: Movie[];
    error: string | null;
    isLoading: boolean;
  };
  favorites: Movie[];
  searchTerm: string;
}

const initialState: MoviesState = {
  movies: {
    data: [],
    error: null,
    isLoading: false,
  },
  favorites: [],
  searchTerm: '',
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { getState, rejectWithValue }) => {
    const state: RootState = getState() as RootState;

    const url = `https://www.omdbapi.com/?s=${state.movies.searchTerm}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      const json = await response.json();
      return json.Search;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.movies.isLoading = true;
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.movies.data = action.payload;
          state.movies.isLoading = false;
        }
      )
      .addCase(fetchMovies.rejected, (state, action) => {
        state.movies.error = action.payload as string;
        state.movies.isLoading = false;
      });
  },
});

export const { setSearchTerm } = moviesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSearchTerm = (state: RootState) => state.movies.searchTerm;
export const selectMovies = (state: RootState) => state.movies.movies;

export default moviesSlice.reducer;
