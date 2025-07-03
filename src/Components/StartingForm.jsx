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
import MyDialog from './dialog';
import { useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { useAuth } from '../Hooks/useAuth';

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

const ensureAuthenticated = async () => {
  try {
    console.log('🔐 Checking access token validity via /auth-check/');
    await axios.get('/auth-check/', { withCredentials: true });
    console.log('✅ Access token is valid');
    return true;
  } catch (err) {
    console.warn('⚠️ /auth-check/ failed:', err.response?.status);

    if (err.response?.status === 401) {
      console.log('🔄 Attempting to refresh access token via /token-refresh/');
      try {
        const refreshRes = await axios.post('/token-refresh/', {}, { withCredentials: true });
        console.log('✅ Access token refreshed:', refreshRes.data);
        return true;
      } catch (refreshErr) {
        console.error('❌ Token refresh failed:', refreshErr.response?.status, refreshErr.response?.data);
        console.log('🚪 Redirecting to login page...');
        window.location.href = '/';
        return false;
      }
    } else {
      console.error('❌ Unexpected error during auth check:', err.response?.status, err.message);
      return false;
    }
  }
};

 


export default function StartingForm() {
  const { isAuthenticated } = useAuth();


  const [data, setData] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [doi, setDoi] = useState('');
  const [isSelectedselectGroups, setIsSelectedselectGroups] = useState('');
  const [isSelectedDoi, setIsSelectedDoi] = useState('');
  const [isValidDoi, setIsValidDoi] = useState(true);
  const isFormValid = isSelectedDoi === true && isSelectedselectGroups !== '';
  const navigate = useNavigate();
  const [flag, setFlag] = useState(0); 
  const [open, setOpen] = useState(false);
  const [textDialog, setTextDialog] = useState('Select Groups *');
  const [projectCodes, setProjectCodes] = useState('');
  const [showSelectedGroups, setShowSelectedGroups] = useState(0);
  const [corresp, setCorresp] = useState('');
  const [other, setOther] = useState('');
  const [first, setFirst] = useState('');
  const location = useLocation();
  const userName = location.state && location.state.userName;
  const userSurname = location.state && location.state.userSurname;


  const handleDoiChange = (event) => {
    setDoi(event.target.value);
    setIsValidDoi(isValidDOI(event.target.value));
    setIsSelectedDoi(isValidDOI(event.target.value))
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIsSelectedselectGroups('selected');
    const splitGroups = (groups) => {

      // Initialize the objects
      const corresp = {};
      const other = {};
      const first = {};

      Object.entries(groups || {}).forEach(([group, properties]) => {
        if (properties.corresp) corresp[group] = true;
        if (properties.other) other[group] = true;
        if (properties.first) first[group] = true;
      });
      return { corresp, other, first };
    };
    const { corresp, other, first } = splitGroups(selectedGroups);

    // Set state based on the split groups
    setCorresp(Object.keys(corresp).join(', '));
    setOther(Object.keys(other).join(', '));
    setFirst(Object.keys(first).join(', '));

    
    if (Object.keys(selectedGroups).length>0) {
      setTextDialog('Groups Selected')
      setShowSelectedGroups(1)
    }
    setOpen(false);
  };

  
  const isValidDOI = (doi) => {
    const trimmedDOI = doi.trim(); // Trim leading and trailing spaces
    const doiPattern = /^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;
    return doiPattern.test(trimmedDOI);
  };

  const handleApiTest = async (event) => {
    event.preventDefault();
    const timeoutId = setTimeout(() => {
    }, 1000000);

    if (isFormValid) {
      setFlag(1);
      let api = ''

      try {

          //check if valid tokens first
          const ok = await ensureAuthenticated();
          if (!ok) return;

          //defining urls
          const api = `/stoca?DOI=${encodeURIComponent(doi)}`
          const csrfUrl = `/csrf/`;

          // ✅ Step 1: Fetch CSRF token
          const csrfRes = await axios.get(csrfUrl, { withCredentials: true });
          const csrfToken = csrfRes.data.csrfToken;
          // console.log("CSRF token from /csrf/:", csrfToken);

          // ✅ Step 2: Call /stoca with CSRF token
          await axios.post(
            api,
            {},  
            {
              withCredentials: true, 
              headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
              }
            }
          )
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
    //the  update might not have been completed yet, and data may still be null.
    //To address this, you should use the useEffect hook to observe changes in the state and 
    //perform actions after the state has been updated. Here's an example of how you can modify your code:

    if (data !== null) {
      if (data === 'No DOIs found') {
        var url = `/KPIs_form_frontend/fail?DOI=${doi}`;
        navigate(url, { state: { data:data, selectedGroups:selectedGroups, projectCodes:projectCodes, userName: userName, userSurname: userSurname}});
      } else {
        var url = `/KPIs_form_frontend/success`;
        navigate(url, { state: { data:data, selectedGroups:selectedGroups, projectCodes:projectCodes, userName: userName, userSurname: userSurname}});
      }
    }

  }, [data]); // Dependency array ensures this effect runs only when 'data' changes

  //if user not authenticated redirect to home page
  useEffect(() => {
    console.log(isAuthenticated)
    if (isAuthenticated === false) {
      navigate('/');
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   const tryLogout = async () => {
  //     try {
  //       const res = await axios.post('/token-refresh/', {}, { withCredentials: true });
  //       console.log('res', res);
  //     } catch (err) {
  //       console.warn('⚠️ Pre-login logout failed (likely already logged out):', err.response?.status);
  //     }
  //   };

  //   tryLogout(); // call it
  // }, []);


  return (
    <>        
      <Typography component="h2" variant="h5" style={{ textAlign: 'right', marginRight: '50px', marginTop: '30px' }}>
        <span style={{ marginRight: '30px', marginTop: '20px', display: 'inline-block', fontStyle: 'italic', fontFamily: 'Georgia' }}> 
          <Avatar sx={{ bgcolor: deepOrange[700],  width: 55, height: 55 }}>
            {userName[0] + userSurname[0]}
          </Avatar> 
        </span>
        <img src={logos} alt="logo" width="150" height="80" style={{ float: 'left', marginLeft: '50px' }} />
      </Typography>
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
          <Typography component="h1" variant="h3" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400, fontWeight: 'bold' }}>
            Add paper to iBET KPIs
          </Typography>
        </div>
        <div style={{ display: 'flex', 
                      gap: '10px',  
                      width: '100vw',  
                      justifyContent: 'center',
                      paddingTop: '40px', 
                      paddingBottom: '60px'}}
        > 
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
          <div>
            <Box display="flex" flexDirection="column" alignItems="left">
              <Button 
                    variant="outlined" 
                    onClick={handleClickOpen}  
                    style={{ 
                        height: '56px', 
                        margin: '0',
                        width: '550px',
                        padding: '0px 14px',
                        color: 'rgba(0, 0, 0, 0.87)',
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                        textTransform: 'none',
                        fontSize: '16px'
                    }}>
                  {textDialog}
              </Button>
              <MyDialog isOpen={open} handleClose={handleClose} onSelectionChangeDialog={setSelectedGroups}/>
              {showSelectedGroups === 1 && (
                <Typography variant="body2" component="span" style={{ paddingLeft: '15px'}}>
                  {first.length > 0 && (
                    <>
                      <span style={{ fontWeight: 'bold'}}>First:</span>
                      <br></br>
                      {first.split(',').map((lab, index) => (
                        <span key={index}>
                          {index > 0 && <br />}
                          &nbsp;&nbsp;&nbsp;&nbsp; <span style={{ fontWeight: 'bold', color: 'red' }}>»</span> {lab.trim()}
                        </span>
                      ))}
                      <br></br>
                    </>
                  )}
                  {corresp.length > 0 && (
                    <>
                      <span style={{ fontWeight: 'bold' }}>Corresp:</span>
                      <br></br>
                      {corresp.split(',').map((lab, index) => (
                        <span key={index}>
                          {index > 0 && <br />}
                          &nbsp;&nbsp;&nbsp;&nbsp; <span style={{ fontWeight: 'bold', color: 'red' }}>»</span> {lab.trim()}
                        </span>
                      ))}
                      <br></br>
                    </>
                  )}
                  {other.length > 0 && (
                    <>
                      <span style={{ fontWeight: 'bold' }}>Other:</span>
                      <br></br>
                      {other.split(',').map((lab, index) => (
                        <span key={index}>
                          {index > 0 && <br />}
                          &nbsp;&nbsp;&nbsp;&nbsp; <span style={{ fontWeight: 'bold', color: 'red' }}>»</span> {lab.trim()}
                        </span>
                      ))}
                      <br></br>
                    </>
                  )}
                </Typography>
              )}
            </Box>
          </div>
          <TextField 
          id="outlined-search" 
          label="Project(s) **" 
          type="search" 
          style={{ width: '27%', height: '40px',margin: '0'}} 
          value={projectCodes} 
          onChange={(e) => setProjectCodes(e.target.value)} 
          helperText={
              <>
                <Typography variant="body2" component="span">
                  Project(s) associated with this KPI. Enter the project LabOrders codes, separated by commas, e.g.: <i><strong>P-123</strong>, <strong>PI-456</strong></i>
                </Typography><br></br><br></br>
              </>
          }/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'right', width: '83.5vw' }}>
          {flag === 0 && (
            <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                onClick={handleApiTest} 
                style={{ 
                  width: '7%', 
                  marginTop:'25px', 
                  position: 'fixed', 
                  bottom: '460px', 
                  right: '170px' 
                }}
                disabled={!isFormValid}
                >
              Next
            </Button>
            )}
          {flag === 1 && (
            <div style={{ width: '7%', marginTop:'25px', position: 'fixed', bottom: '420px', right: '190px' }}>
              <SPLoader />
            </div>
          )}
        </div>
        <div style={{ position: 'fixed', bottom: '80px', right: '170px', textAlign: 'right' }}>
          <Typography variant="body2" component="span" fontStyle="italic" fontWeight="bold">
            * Mandatory field <br />
            ** Mandatory for iBETXplore, FCT, EC and other publicly funded projects
          </Typography>
        </div>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </>
  );
}