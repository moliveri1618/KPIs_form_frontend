import React, {useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import Copyright from './CopyRight';
import logos from './Images/ibet_logo.png'
import axios from 'axios';

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
  1395)
];


export default function FormSuccess() {
  const location = useLocation();
  const jsonData = location.state && location.state.data;
  const selectedGroups = location.state && location.state.selectedGroups;
  const doi = location.state && location.state.doi;
  const projectCodes = location.state && location.state.projectCodes;

  const splitGroups = (groups) => {
    const corresp = {}, other = {}, first = {};
    Object.entries(groups || {}).forEach(([group, properties]) => {
      if (properties.corresp) corresp[group] = true;
      if (properties.other) other[group] = true;
      if (properties.first) first[group] = true;
    });
    return { corresp, other, first };
  };

  const { corresp, other, first } = splitGroups(selectedGroups);

  // Function to reformat the names
  const reformatNames = (namesStr) => {
    if (!namesStr) return '';
    const namesList = namesStr.split(" and ");
    const reorderedNames = namesList.map(name => {
      const [lastName, firstName] = name.split(', ');
      return `${firstName} ${lastName}`;
    });
    return reorderedNames.join(", ");
  };
  
  const reformattedNames = reformatNames(jsonData['author']);

  const notify = () => {
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
    notify()

    try {
      const trimmedDOI = doi.trim();
      let api = 'http://' + process.env.REACT_APP_API_URL_DEV + `/doi_post/`

      jsonData['research_groups_first'] = Object.keys(first).join(", ")
      jsonData['research_groups_other'] = Object.keys(other).join(", ")
      jsonData['research_groups_corresp'] = Object.keys(corresp).join(", ")
      jsonData['projects'] = projectCodes
    
      axios.post(api, jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }})
        .then(response => {
          console.log('Response:', response);
        })
        .catch(error => {
          console.error(error);
        });
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }


    // Cleanup function
    return () => {
      toast.dismiss(); // Dismiss any existing toasts when the component unmounts
    };
  }, []); 


  return (
    <>
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
        <Link to="/KPIs_form_frontend">
          <img src={logos} alt="logo" width="150" height="80" style={{ float: 'left', marginRight: '1450px', paddingTop: '40px'  }} />
        </Link>        
        <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '20px'  }}>
          <Typography component="h1" variant="h3" style={{ fontFamily: 'Sedan-Regular', fontWeight: 400 }}>
            Publication Details
          </Typography>
        </div>

        <div style={{ display: 'flex', 
                      gap: '10px',  
                      width: '100vw',  
                      justifyContent: 'center',
                      paddingTop: '40px', 
                      paddingBottom: '20px'}}>        
          <TableContainer component={Paper} style={{ width: '80%' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Title:</TableCell>
                  <TableCell>
                    <Tooltip  title={jsonData['title']} arrow>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {jsonData['title']}
                      </div>
                    </Tooltip>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Authors:</TableCell>
                  <TableCell>
                    <Tooltip  arrow>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                        {reformattedNames}
                      </div>
                    </Tooltip>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Year:</TableCell>
                  <TableCell>
                    <Tooltip  title={jsonData['year']} arrow>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                        {jsonData['year']}
                      </div>
                    </Tooltip>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Journal:</TableCell>
                  <TableCell>
                    <Tooltip  title={jsonData['journal']} arrow>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                        {jsonData['journal']}
                      </div>
                    </Tooltip>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Volume:</TableCell>
                  <TableCell>
                    <Tooltip  title={jsonData['volume']} arrow>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                        {jsonData['volume']}
                      </div>
                    </Tooltip>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Pages:</TableCell>
                  <TableCell>
                    <Tooltip  title={jsonData['pages']} arrow>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                        {jsonData['pages']}
                      </div>
                    </Tooltip>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Impact Factor:</TableCell>
                  <TableCell>
                    <Tooltip  title={jsonData['impact_factor']} arrow>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                        {jsonData['impact_factor']}
                      </div>
                    </Tooltip>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Publisher:</TableCell>
                  <TableCell>
                    <Tooltip  title={jsonData['publisher']} arrow>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                        {jsonData['publisher']}
                      </div>
                    </Tooltip>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Research Groups (<span style={{ fontStyle: 'italic' }}>First</span>):</TableCell>
                  <TableCell>
                    <Tooltip arrow>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                        { Object.keys(first).join(", ")}
                      </div>
                    </Tooltip>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Research Groups (<span style={{ fontStyle: 'italic' }}>Corresp</span>):</TableCell>
                  <TableCell>
                    <Tooltip arrow>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                        { Object.keys(corresp).join(", ")}
                      </div>
                    </Tooltip>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Research Groups (<span style={{ fontStyle: 'italic' }}>Other</span>):</TableCell>
                  <TableCell>
                    <Tooltip arrow>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                        { Object.keys(other).join(", ")}
                      </div>
                    </Tooltip>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Project(s):</TableCell>
                  <TableCell>
                    <Tooltip arrow>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                        {projectCodes}
                      </div>
                    </Tooltip>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Citation Count:</TableCell>
                  <TableCell>
                    <Tooltip arrow>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                        {jsonData['citation_count']}
                      </div>
                    </Tooltip>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Article Type:</TableCell>
                  <TableCell>
                    <Tooltip arrow>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                        {jsonData['article_type']}
                      </div>
                    </Tooltip>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>DOI:</TableCell>
                    <TableCell>
                      <Tooltip arrow>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                          {doi}
                        </div>
                      </Tooltip>
                    </TableCell>
                </TableRow>
                
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div style={{ display: 'flex', justifyContent: 'right', width: '81.5vw' }}>
          <Link to="/KPIs_form_frontend">
            <Button variant="contained" color="primary" style={{ width: '15%' }}>
              Back
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
      <Copyright sx={{ mt: 5 }} />
    </>
  );
}
