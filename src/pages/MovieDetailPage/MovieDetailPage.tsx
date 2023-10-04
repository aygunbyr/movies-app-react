import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchMovie,
  selectMovie,
  setMovieID,
} from '../../redux/features/movies/moviesSlice';
import {
  selectFavorites,
  toggleFavoriteMovie,
} from '../../redux/features/favorites/favoritesSlice';
import { MovieDetail } from '../../types/MovieDetail';

export const MovieDetailPage = () => {
  const { imdbID } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (imdbID) {
      dispatch(setMovieID(imdbID));
      dispatch(fetchMovie());
    }
  }, [imdbID, dispatch]);

  const { data: movie, error, isLoading } = useAppSelector(selectMovie);

  const favorites = useAppSelector(selectFavorites);

  const isFavorite = useMemo(() => {
    return favorites.some((favorite) => favorite.imdbID === movie?.imdbID);
  }, [favorites, movie]);

  const handleToggleFavoriteMovie = (movie: MovieDetail) => {
    const { Title, Year, imdbID, Type, Poster } = movie;
    dispatch(
      toggleFavoriteMovie({
        Title,
        Year,
        imdbID,
        Type,
        Poster,
      })
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {movie && (
        <>
          <img
            src={movie.Poster}
            alt={movie.Title}
            style={{ display: 'block', marginBottom: 20 }}
          />
          {isFavorite ? (
            <Button
              variant="contained"
              color="error"
              style={{ marginBottom: 10, width: 300 }}
              onClick={() => handleToggleFavoriteMovie(movie)}
            >
              <DeleteIcon style={{ marginRight: 8 }} aria-hidden="true" />{' '}
              Remove from favorites
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              style={{
                marginBottom: 10,
                width: 300,
              }}
              onClick={() => handleToggleFavoriteMovie(movie)}
            >
              <AddIcon style={{ marginRight: 8 }} aria-hidden="true" /> Add to
              favorites
            </Button>
          )}
          <Typography variant="h3">{movie.Title}</Typography>
          <Typography variant="body1">Year: {movie.Year}</Typography>
          <Typography variant="body1">Genre: {movie.Genre}</Typography>
          <Typography variant="body1">Runtime: {movie.Runtime}</Typography>
          <Typography variant="body1">Director: {movie.Director}</Typography>
          <Typography variant="body1">Writer: {movie.Writer}</Typography>
          <Typography variant="body1">Actors: {movie.Actors}</Typography>
          <Typography variant="body1">Plot: {movie.Plot}</Typography>
          <Typography variant="body1">Language: {movie.Language}</Typography>
          <Typography variant="body1">IMDb ID: {movie.imdbID}</Typography>
          <Typography variant="body1">
            IMDb Rating: {movie.imdbRating}
          </Typography>
        </>
      )}
    </>
  );
};
