import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export const Loading = () => {
  const emptyArray = new Array(8).fill(null);
  return (
    <Grid container wrap="wrap" style={{ gap: 20 }}>
      {emptyArray.map((_, index) => (
        <Box
          key={index}
          sx={{
            marginRight: 0.5,
            my: 5,
            display: 'flex',
          }}
        >
          <Skeleton variant="rectangular" width={345} height={460} />
        </Box>
      ))}
    </Grid>
  );
};
