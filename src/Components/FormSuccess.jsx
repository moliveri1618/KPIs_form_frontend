import React, {useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  title,
  volume,
  ISSN,
  url,
  number,
  journal,
  publisher,
  author,
  year,
  month,
  pages
) {
  return { title, volume, ISSN, url, number,journal, publisher, author, year, month, pages };
}

const rows = [
  createData(8789, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 88, 99),
  // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  // createData('Eclair', 262, 16.0, 24, 6.0),
  // createData('Cupcake', 305, 3.7, 67, 4.3),
  // createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export default function FormFail() {

  const notify = () => {
    console.log('hi')
    toast.success('The information for this paper are successfully saved into the database 😍', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  useEffect(() => {
    console.log(rows)
    notify()

    // Cleanup function
    return () => {
      toast.dismiss(); // Dismiss any existing toasts when the component unmounts
    };
  }, []); 


  return (
    <Box
      component="form"
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '20px'  }}>
        <Typography component="h1" variant="h3" style={{ fontFamily: 'Sedan-Regular', fontWeight: 400 }}>
          DOI Info
        </Typography>
      </div>
      <div style={{ display: 'flex', 
                    gap: '10px',  
                    width: '100vw',  
                    justifyContent: 'center',
                    paddingTop: '40px', 
                    paddingBottom: '20px'}}>
        <TableContainer component={Paper}  style={{ width: '80%' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }} >Title </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Volume</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">ISSN</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Url</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Number</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Journal</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Publisher</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Author</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Year</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Month</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Pages</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.volume}</TableCell>
                <TableCell align="right">{row.ISSN}</TableCell>
                <TableCell align="right">{row.url}</TableCell>
                <TableCell align="right">{row.number}</TableCell>
                <TableCell align="right">{row.journal}</TableCell>
                <TableCell align="right">{row.publisher}</TableCell>
                <TableCell align="right">{row.author}</TableCell>
                <TableCell align="right">{row.year}</TableCell>
                <TableCell align="right">{row.month}</TableCell>
                <TableCell align="right">{row.pages}</TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ display: 'flex', justifyContent: 'right', width: '82vw' }}>
        <Link to="/home">
          <Button variant="contained" color="primary" style={{ width: '15%' }}>
            Close
          </Button>
      </Link>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          />
      </div>
    </Box>
  );
}


