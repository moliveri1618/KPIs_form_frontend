import React, {useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from '@mui/material/Tooltip';
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
  createData('Combination of Zinc Oxide Photocatalysis with Membrane Filtration for Surface Water Disinfection', 
  12,
  2305-5934, 
  'http://dx.doi.org/10.3390/foods12071383', 
  7, 
  'foods', 
  'MDPI AG', 
  'Mecha, Elsa and Alves, Mara Lisa and Bento da Silva, Andreia and Pereira, Ana Bárbara and Rubiales, Diego and Vaz Patto, Maria Carlota and Bronze, Maria Rosário', 
  2023, 
  'mar', 
  1395),
  createData('Combination of Zinc Oxide Photocatalysis with Membrane Filtration for Surface Water Disinfection', 
  12,
  2305-5934, 
  'http://dx.doi.org/10.3390/foods12071383', 
  7, 
  'foods', 
  'MDPI AG', 
  'Mecha, Elsa and Alves, Mara Lisa and Bento da Silva, Andreia and Pereira, Ana Bárbara and Rubiales, Diego and Vaz Patto, Maria Carlota and Bronze, Maria Rosário', 
  2023, 
  'mar', 
  1395),

  createData('Combination of Zinc Oxide Photocatalysis with Membrane Filtration for Surface Water Disinfection', 
  12,
  2305-5934, 
  'http://dx.doi.org/10.3390/foods12071383', 
  7, 
  'foods', 
  'MDPI AG', 
  'Mecha, Elsa and Alves, Mara Lisa and Bento da Silva, Andreia and Pereira, Ana Bárbara and Rubiales, Diego and Vaz Patto, Maria Carlota and Bronze, Maria Rosário', 
  2023, 
  'mar', 
  1395),
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
                <TableCell sx={{ fontWeight: 'bold' }} >Volume</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >ISSN</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Url</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Number</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Journal</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Publisher</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Author</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Year</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Month</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Pages</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th"scope="row">
                  <Tooltip title={row.title} arrow >
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px' }}>
                      {row.title}
                    </div>
                  </Tooltip>
                </TableCell>
                <TableCell component="th"scope="row">
                  <Tooltip title={row.volume} arrow >
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px' }}>
                        {row.volume}
                      </div>
                    </Tooltip>
                </TableCell>
                <TableCell component="th"scope="row">
                  <Tooltip title={row.ISSN} arrow >
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px' }}>
                        {row.ISSN}
                      </div>
                    </Tooltip>
                </TableCell>
                <TableCell component="th"scope="row">
                  <Tooltip title={row.url} arrow >
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px' }}>
                        {row.url}
                      </div>
                    </Tooltip>
                </TableCell>
                <TableCell component="th"scope="row">
                  <Tooltip title={row.number} arrow >
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px' }}>
                        {row.number}
                      </div>
                    </Tooltip>
                </TableCell>
                <TableCell component="th"scope="row">
                  <Tooltip title={row.journal} arrow >
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px' }}>
                        {row.journal}
                      </div>
                    </Tooltip>
                </TableCell>
                <TableCell component="th"scope="row">
                  <Tooltip title={row.publisher} arrow >
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px' }}>
                        {row.publisher}
                      </div>
                    </Tooltip>
                </TableCell>
                <TableCell component="th"scope="row">
                  <Tooltip title={row.author} arrow >
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px' }}>
                        {row.author}
                      </div>
                    </Tooltip>
                </TableCell>
                <TableCell component="th"scope="row">
                  <Tooltip title={row.year} arrow >
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px' }}>
                        {row.year}
                      </div>
                    </Tooltip>
                </TableCell>
                <TableCell component="th"scope="row">
                  <Tooltip title={row.month} arrow >
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px' }}>
                        {row.month}
                      </div>
                    </Tooltip>
                </TableCell>
                <TableCell component="th"scope="row">
                  <Tooltip title={row.pages} arrow >
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px' }}>
                        {row.pages}
                      </div>
                    </Tooltip>
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ display: 'flex', justifyContent: 'right', width: '82vw' }}>
        <Link to="/KPIs_form_frontend">
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
