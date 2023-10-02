import { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { Movie } from '../../types/Movie';

interface MovieCardProperties {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProperties) => {
  const [favorited, setFavorited] = useState(false);

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
        <Typography variant="body2" color="text.secondary">
          {movie.Title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => setFavorited(!favorited)}
        >
          <FavoriteIcon style={favorited ? { color: red[500] } : {}} />
        </IconButton>
      </CardActions>
    </Card>
  );
};
