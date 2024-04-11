import React, {useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logos from './Images/ibet_logo.png'
import SPLoader from './SpinnerLoader';
import Copyright from './CopyRight';
import Alert from '@mui/material/Alert';
import MyDialog from './dialog';
import { useLocation  } from 'react-router-dom';


export default function StartingForm() {
  const location = useLocation();
  const queryString = location.search;
  const queryParams = new URLSearchParams(queryString);
  const token = queryParams.get('token');
  const [data, setData] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [doi, setDoi] = useState('');
  const [isValidDoi, setIsValidDoi] = useState(true);
  const navigate = useNavigate();
  const [flag, setFlag] = useState(0); 
  const [open, setOpen] = useState(false);
  const [textDialog, setTextDialog] = useState('Select Groups');
  const [projectCodes, setProjectCodes] = useState('');

  const check_token_validity = (token) => {
    let api = ''
    try {
      api = 'http://' + process.env.REACT_APP_API_URL_DEV + `/check_the_cookie`
      axios.get(api)
        .then(response => {
          console.log(response.data['cookie'])
        })
        .catch(error => {
          console.error(error);
        });
    
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  check_token_validity(token)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {

    if (Object.keys(selectedGroups).length>0) {
      setTextDialog('Groups Selected')
    }
    setOpen(false);
  };

  const isValidDOI = (doi) => {
    const trimmedDOI = doi.trim(); // Trim leading and trailing spaces
    const doiPattern = /^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;
    return doiPattern.test(trimmedDOI);
  };

  const handleDoiChange = (event) => {
    setDoi(event.target.value);
    setIsValidDoi(isValidDOI(event.target.value));
  };

  const handleApiTest = async (event) => {
    event.preventDefault();
    const timeoutId = setTimeout(() => {
    }, 1000000);
    if (isValidDoi) {
      setFlag(1);
      let api = ''
      try {
          const trimmedDOI = doi.trim();
          api = 'http://' + process.env.REACT_APP_API_URL_DEV + `/stoca?DOI=${trimmedDOI}`
          axios.post(api)
            .then(response => {
              setData(response.data['response']);
            })
            .catch(error => {
              console.error(error);
            });
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

  };

  useEffect(() => {
    
    //The issue here might be related to the asynchronous nature of the axios.post call. 
    //When you call console.log(data) immediately after setData(response.data['response']), 
    //the state update might not have been completed yet, and data may still be null.
    //To address this, you should use the useEffect hook to observe changes in the state and 
    //perform actions after the state has been updated. Here's an example of how you can modify your code:

    if (data !== null) {
      if (data === 'No DOIs found') {
        var url = `/KPIs_form_frontend/fail?DOI=${doi}`;
        navigate(url);
      } else {
        var url = `/KPIs_form_frontend/success`;
        navigate(url, { state: { data:data, selectedGroups:selectedGroups, doi: doi, projectCodes:projectCodes} });
      }
    }
  }, [data]); // Dependency array ensures this effect runs only when 'data' changes

  // if (!isValidRedirect) {
  //   return (
  //     <Alert 
  //       severity="error"  
  //       style={{ 
  //         textAlign: 'center', 
  //         marginTop: '0px', // Adds a top margin, adjust as needed
  //       }}
  //     >
  //       <Typography variant="h6" component="div" style={{ fontSize: '1.25rem' }}>
  //         Error: This page can't be accessible directly.
  //       </Typography>
  //     </Alert>
  //   );
  // }

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
        <Alert severity="info"  style={{ textAlign: 'center'}}>
        This is a simple interface to test our new script to retrieve paper details based on the DOI alone. This script will be integrated into a new approach to collect iBET's scientific KPIs to save time that is best used doing actual research.<br /><br />
        Thanks for testing! Any feedback is welcome. Please send an email to Pedro Cruz (pedro.cruz@ibet.pt), Ines Isidro (iaisidro@ibet.pt) and Mauro Oliveri (mauro.oliveri@ibet.pt) or reach out to any of us directly.
        </Alert>
        <img src={logos} alt="logo" width="150" height="80" style={{ float: 'left', marginRight: '1450px', paddingTop: '40px'  }} />
        <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '20px'  }}>
          <Typography component="h1" variant="h3" style={{ fontFamily: 'Sedan-Regular', fontWeight: 400 }}>
            Add Publication
          </Typography>
        </div>
        <div style={{ display: 'flex', 
                      gap: '10px',  
                      width: '100vw',  
                      justifyContent: 'center',
                      paddingTop: '40px', 
                      paddingBottom: '60px'}}> 
          <div>
            <Button variant="outlined" onClick={handleClickOpen}  
                    style={{ 
                      height: '56px', 
                      margin: '0',
                      width: '550px',
                      padding: '0px 14px',
                      color: 'rgba(0, 0, 0, 0.87)',
                      borderColor: 'rgba(0, 0, 0, 0.23)'
                      }}>
              {textDialog}
            </Button>
            <MyDialog isOpen={open} handleClose={handleClose} onSelectionChangeDialog={setSelectedGroups}/>
          </div>
          <TextField 
          id="outlined-search" 
          label="DOI *" 
          type="search" 
          style={{ width: '27%', height: '40px',margin: '0'}} 
          value={doi} 
          onChange={handleDoiChange}
          error={!isValidDoi}
          helperText={
              <>
                <Typography variant="body2" component="span">
                    e.g.:
                </Typography>
                {' '}
                <Typography variant="body2" component="span" style={{ fontWeight: 'bold' }}>
                    10.1016/j.carbpol.2016.01.046
                </Typography>
              </>
          }/>
          <TextField 
          id="outlined-search" 
          label="Project(s)" 
          type="search" 
          style={{ width: '27%', height: '40px',margin: '0'}} 
          value={projectCodes} 
          onChange={(e) => setProjectCodes(e.target.value)} 
          helperText={
              <>
                <Typography variant="body2" component="span">
                  Project(s) associated with this KPI. Enter the project LabOrders codes, separated by commas, e.g.: <i><strong>P-123</strong>, <strong>PI-456</strong></i>
                </Typography>
              </>
          }/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'right', width: '83.5vw' }}>
          {flag === 0 && (
            <Link>
              <Button type="submit" variant="contained" color="primary" onClick={handleApiTest} style={{ width: '15%', marginTop:'20px' }}>
                Submit
              </Button>
            </Link>
            )}
          {flag === 1 && (
            <div style={{}}>
              <SPLoader />
            </div>
          )}
        </div>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </>
  );
}