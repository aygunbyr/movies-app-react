import { Box, Typography } from '@mui/material';
import { MovieCard } from '../../components/MovieCard/MovieCard';

const Movies = () => {
  return (
    <div>
      <Typography variant="h3">All Movies</Typography>
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
