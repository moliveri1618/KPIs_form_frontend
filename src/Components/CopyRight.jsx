import React from 'react';
import Typography from '@mui/material/Typography';

function Copyright() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8f8f8', // optional background color
        padding: '8px', // optional padding
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center" style={{ marginBottom: '8px' }}>
        Developed by Pedro Cruz, Inês Isidro and Mauro Oliveri.
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" style={{ marginTop: '0' }}>
        {'Copyright © '}
        <strong>{'2023 iBET - Instituto de Biologia Experimental e Tecnológica.'}{' '}</strong>
      </Typography>
    </div>
  );
}

export default Copyright;
