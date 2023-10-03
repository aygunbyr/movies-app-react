import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchMovie,
  selectMovie,
  setMovieID,
} from '../../redux/features/movies/moviesSlice';
import { useEffect } from 'react';
import { Typography } from '@mui/material';

export const MovieDetail = () => {
  const { imdbID } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (imdbID) {
      dispatch(setMovieID(imdbID));
      dispatch(fetchMovie());
    }
  }, [imdbID, dispatch]);

  const { data: movie, error, isLoading } = useAppSelector(selectMovie);

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
          <img src={movie.Poster} alt={movie.Title} />
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
