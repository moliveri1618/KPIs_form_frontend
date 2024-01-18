import React, {useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


function Copyright(props) {
    return (
      <Container>
        <Typography variant="body2" color="text.secondary" align="center" {...props} style={{ }}>
          Developed by Pedro Cruz, Inês Isidro and Mauro Oliveri.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" {...props} style={{ marginTop: '0' }}>
          {'Copyright © '}
          <strong>{'2023 iBET - Instituto de Biologia Experimental e Tecnológica.'}{' '}</strong>
        </Typography>
      </Container>
    );
  }
  
  export default Copyright;