import React from 'react';
import { Box, Typography } from '@mui/material';

function WarningBanner() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 2000,
        backgroundColor: '#fde2e2',
        border: '2px solid red',
        borderRadius: '0 0 8px 8px',
        padding: '16px 20px', // taller padding
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Typography
        variant="body1" // slightly bigger variant
        sx={{
          fontWeight: 600, // valid MUI weight
          fontSize: '1rem', // optional override
          lineHeight: 1.6,
          color: '#8b0000',
        }}
      >
        Warning: Security still being improved, do not use any critical data.
      </Typography>
    </Box>
  );
}

export default WarningBanner;
