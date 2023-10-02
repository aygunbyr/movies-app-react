import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { Movie } from '../../types/Movie';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectFavorites,
  toggleFavoriteMovie,
} from '../../redux/features/movies/moviesSlice';
import { useCallback, useMemo } from 'react';
interface MovieCardProperties {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProperties) => {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(selectFavorites);

  const isFavorite = useMemo(() => {
    return favorites.some((fav) => fav.imdbID === movie.imdbID);
  }, [favorites, movie]);

  const toggleFavorite = useCallback(async () => {
    await dispatch(toggleFavoriteMovie(movie));
  }, [dispatch, movie]);

  return (
    <Card sx={{ width: 345 }}>
      <CardMedia
        component="img"
        height="300"
        image={movie.Poster}
        alt={movie.Title}
        style={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h5" color="text.secondary">
          {movie.Title}
        </Typography>
        <Typography variant="subtitle1">{movie.Year}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={toggleFavorite}>
          <FavoriteIcon style={isFavorite ? { color: red[500] } : {}} />
        </IconButton>
      </CardActions>
    </Card>
  );
};
