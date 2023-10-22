import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Movie, MovieDetail } from '../../../types';

interface MoviesState {
  movies: {
    data: Movie[];
    error: string | null;
    isLoading: boolean;
  };
  movie: {
    imdbID: string;
    data: MovieDetail | null;
    error: string | null;
    isLoading: boolean;
  };
  searchTerm: string;
}

const initialState: MoviesState = {
  movies: {
    data: [],
    error: null,
    isLoading: false,
  },
  movie: {
    imdbID: '',
    data: null,
    error: null,
    isLoading: false,
  },
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
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchMovie = createAsyncThunk(
  'movies/fetchMovie',
  async (_, { getState, rejectWithValue }) => {
    const state: RootState = getState() as RootState;

    const url = `https://www.omdbapi.com/?i=${state.movies.movie.imdbID}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      const json = await response.json();
      return json;
    } catch (error) {
      return rejectWithValue((error as Error).message);
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
    setMovieID: (state, action: PayloadAction<string>) => {
      state.movie.imdbID = action.payload;
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
      })
      .addCase(fetchMovie.pending, (state) => {
        state.movie.isLoading = true;
      })
      .addCase(
        fetchMovie.fulfilled,
        (state, action: PayloadAction<MovieDetail>) => {
          state.movie.data = action.payload;
          state.movie.isLoading = false;
        }
      )
      .addCase(fetchMovie.rejected, (state, action) => {
        state.movie.error = action.payload as string;
        state.movie.isLoading = false;
      });
  },
});

export const { setSearchTerm, setMovieID } = moviesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSearchTerm = (state: RootState) => state.movies.searchTerm;
export const selectMovies = (state: RootState) => state.movies.movies;
export const selectMovie = (state: RootState) => state.movies.movie;

export default moviesSlice.reducer;
