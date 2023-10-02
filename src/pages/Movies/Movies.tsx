import { Box, Typography } from '@mui/material';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { useAppSelector } from '../../redux/hooks';
import {
  selectMovies,
  selectSearchTerm,
} from '../../redux/features/movies/moviesSlice';
import { Loading } from '../../components/Loading/Loading';

const Movies = () => {
  const searchTerm = useAppSelector(selectSearchTerm);
  const { data: movies, error, isLoading } = useAppSelector(selectMovies);

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
