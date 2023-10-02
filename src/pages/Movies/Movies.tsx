import { Box, Typography } from '@mui/material';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { useAppSelector } from '../../redux/hooks';
import { selectSearchTerm } from '../../redux/features/movies/moviesSlice';

const Movies = () => {
  const searchTerm = useAppSelector((state) => selectSearchTerm);

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
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </Box>
    </div>
  );
};

export default Movies;
