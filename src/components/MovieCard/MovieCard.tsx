import { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';

export const MovieCard = () => {
  const [favorited, setFavorited] = useState(false);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image="/assets/jakob-owens-CiUR8zISX60-unsplash.jpg"
        alt="Movie name"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
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
