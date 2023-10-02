import { Box, Typography } from '@mui/material';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { useAppSelector } from '../../redux/hooks';
import { selectFavorites } from '../../redux/features/movies/moviesSlice';

const Movies = () => {
  const favorites = useAppSelector(selectFavorites);

  return (
    <div>
      <Typography variant="h3">Favorites</Typography>
      <Typography variant="h6">Add movies to your favorites...</Typography>
      <Box
        style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 20 }}
      >
        {favorites?.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </Box>
    </div>
  );
};

export default Movies;
