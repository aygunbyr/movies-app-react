import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { useAppSelector } from '../../redux/hooks';
import {
  selectMovies,
  selectSearchTerm,
  setSearchTerm,
} from '../../redux/features/movies/moviesSlice';
import { Loading } from '../../components/Loading/Loading';
import { MOVIES_PATH } from '../../constants';

const Movies = () => {
  const searchTerm = useAppSelector(selectSearchTerm);
  const { data: movies, error, isLoading } = useAppSelector(selectMovies);

  const { search } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (search) {
      setSearchTerm(search);
      navigate(`${MOVIES_PATH}?search=${search}`);
    }
  }, [search, navigate]);

  if (isLoading) {
    return (
      <>
        <Typography variant="h3">All Movies</Typography>
        <Typography variant="h6">Loading...</Typography>
        <Loading />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Typography variant="h3">All Movies</Typography>
        <Typography variant="h6">Error fetching movies: {error}</Typography>
      </>
    );
  }

  return (
    <div>
      <Typography variant="h3">All Movies</Typography>
      {searchTerm ? (
        <Typography variant="h6">
          {`Showing results for ${searchTerm}`}
        </Typography>
      ) : (
        <Typography variant="h6">
          Search for movies to show movies...
        </Typography>
      )}

      <Box
        style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 20 }}
      >
        {movies?.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </Box>
    </div>
  );
};

export default Movies;
