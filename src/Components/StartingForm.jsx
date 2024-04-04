import React, {useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logos from './Images/ibet_logo.png'
import SPLoader from './SpinnerLoader';
import Copyright from './CopyRight';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function StartingForm() {
  const [data, setData] = useState(null);
  const groups = ['Lab X', 'Lab Y', 'Lab Z'];
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [doi, setDoi] = useState('');
  const [project, setProject] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isValidDoi, setIsValidDoi] = useState(true);
  const [isValidProject, setIsValidProject] = useState('');
  const [selectedGroupFirst, setSelectedGroupFirst] = useState([]);
  const [selectedGroupOther, setSelectedGroupOther] = useState([]);
  const [selectedGroupCorresp, setSelectedGroupCorresp] = useState([]);
  const navigate = useNavigate();
  const [flag, setFlag] = useState(0); // Use state for flag
  const [renderValue, setRenderValue] = useState(''); // Use state for flag
  
  const isValidDOI = (doi) => {
    const doiPattern = /^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;
    return doiPattern.test(doi);
  };

  const handleChange = (event) => {
    setSelectedGroups(event.target.value)
    validateForm(event.target.value, doi, project);
  };

  const handleDoiChange = (event) => {
    setDoi(event.target.value);
    setIsValidDoi(isValidDOI(event.target.value));
    validateForm(selectedGroups, event.target.value, project);
  };

  // const handleProjectChange = (event) => {
  //   setProject(event.target.value);
  //   setIsValidProject(isValidDOI(event.target.value));
  //   validateForm(selectedGroups, doi, event.target.value);
  // };

  const validateForm = (selectedGroups, doiValue) => {
    const isValidForm = selectedGroups.length > 0 && doiValue.trim() !== '';
    setIsValid(isValidForm);
    setIsValidProject(isValidForm);
  };


  const handleCheckboxChangeFirst = (value) => {
    const isSelected = selectedGroupFirst.includes(value);
    setRenderValue('Groups Selected')
    //add or substract rendervalues
    // let newRenderValue = renderValue + value;
    // let oldRenderValue = renderValue.slice(0, renderValue.length - value.length);

    // If selected, remove from the array; otherwise, add to the array
      setSelectedGroupFirst((prevSelectedGroups) =>
      isSelected
        ? (console.log(renderValue),
          //setRenderValue(oldRenderValue),
          prevSelectedGroups.filter((group) => group !== value))
        : (console.log(renderValue),
          //setRenderValue(newRenderValue),
          [...prevSelectedGroups, value])
    );
  };

  const handleCheckboxChangeOther = (value) => {
    const isSelected = selectedGroupOther.includes(value);
    setRenderValue('Groups Selected')
    //add or substract rendervalues
    // let newRenderValue = renderValue + value;
    // let oldRenderValue = renderValue.slice(0, renderValue.length - value.length);

    // If selected, remove from the array; otherwise, add to the array
    setSelectedGroupOther((prevSelectedGroups) =>
      isSelected
        ? (console.log(renderValue),
          //setRenderValue(oldRenderValue),
          prevSelectedGroups.filter((group) => group !== value))
        : (console.log(renderValue),
          //setRenderValue(newRenderValue),
          [...prevSelectedGroups, value])
      );

  };

  const handleCheckboxChangeCorresp = (value) => {
    // Check if the group is already selected
    const isSelected = selectedGroupCorresp.includes(value);
    setRenderValue('Groups Selected')
    // If selected, remove from the array; otherwise, add to the array
    setSelectedGroupCorresp((prevSelectedGroups) =>
      isSelected
        ? prevSelectedGroups.filter((group) => group !== value)
        : [...prevSelectedGroups, value]
    );
  };





  // const handleCheckboxChange = (value, group) => {
  //   switch (group) {
  //     case 'first':
  //       setRenderValue(String(value) +' (First)')
  //       setSelectedGroupFirst(value);
  //       setSelectedGroupCorresp(null); // Unselect other groups
  //       setSelectedGroupOther(null);
  //       break;
  //     case 'corresp':
  //       setRenderValue(String(value) +' (Corresponding)')
  //       setSelectedGroupCorresp(value);
  //       setSelectedGroupFirst(null); // Unselect other groups
  //       setSelectedGroupOther(null);
  //       break;
  //     case 'other':
  //       setRenderValue(String(value) + ' (Other)')
  //       setSelectedGroupOther(value);
  //       setSelectedGroupFirst(null); // Unselect other groups
  //       setSelectedGroupCorresp(null);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  


  // const handleCheckboxChange = (value, group) => {
  //   switch (group) {
  //     case 'first':
  //       setRenderValue((prev) => prev.concat(`${value} (First)`));
  //       setSelectedGroupFirst((prev) => [...prev, value]);
  //       setSelectedGroupCorresp((prev) => prev.filter((item) => item !== value));
  //       setSelectedGroupOther((prev) => prev.filter((item) => item !== value));
  //       break;
  //     case 'corresp':
  //       setRenderValue((prev) => prev.concat(`${value} (Corresponding)`));
  //       setSelectedGroupCorresp((prev) => [...prev, value]);
  //       setSelectedGroupFirst((prev) => prev.filter((item) => item !== value));
  //       setSelectedGroupOther((prev) => prev.filter((item) => item !== value));
  //       break;
  //     case 'other':
  //       setRenderValue((prev) => prev.concat(`${value} (Other)`));
  //       setSelectedGroupOther((prev) => [...prev, value]);
  //       setSelectedGroupFirst((prev) => prev.filter((item) => item !== value));
  //       setSelectedGroupCorresp((prev) => prev.filter((item) => item !== value));
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleApiTest = async (event) => {
    event.preventDefault();
    const timeoutId = setTimeout(() => {
    }, 1000000);
    if (isValid && isValidDoi && isValidProject) {
      setFlag(1);
      let api = ''
      try {
          api = 'http://' + process.env.REACT_APP_API_URL_DEV + `/stoca?DOI=${doi}`
          axios.post(api)
            .then(response => {
              // The promise has resolved, and you can access the response data here
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
        navigate(url, { state: { data } });
      }
    }

  }, [data]); // Dependency array ensures this effect runs only when 'data' changes


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
        {/* <div style={{ marginBottom: '5px', fontWeight: 'bold', fontStyle: 'italic', borderBottom: '2px solid black'  }}>"This is a simple interface to test our new script to retrieve paper details based on the DOI alone. This script will be integrated into a new approach to collect iBET's scientific KPIs to save time that is best used doing actual research.</div>
        <div style={{ marginBottom: '50px', fontWeight: 'bold', fontStyle: 'italic', borderBottom: '2px solid black'  }}>"Thanks for testing! Any feedback is welcome. Please send an email to Pedro Cruz, Ines Isidro and Mauro Oliveri or reach out to any of us directly.</div> */}
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
          <FormControl fullWidth style={{ width: '27%' }}>
            <InputLabel id="demo-simple-select-label">Groups *</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              displayEmpty
              value={selectedGroups}
              label="Group"
              onChange={handleChange}
              renderValue={() => {
                return renderValue;
              }}
              multiple
            >
              <MenuItem value="">
                <em> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     First &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                     Corresponding &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                     Other
                </em>
              </MenuItem>
            {groups.map((value) => (
              <MenuItem key={value} value={value}>
              <span style={{ marginRight: '75px' }}>{value}</span>
                <Checkbox style={{ marginRight: '95px' }}
                  checked={selectedGroupFirst.includes(value)}
                  onChange={() => handleCheckboxChangeFirst(value)}
                />
                <Checkbox style={{ marginRight: '105px' }}
                  checked={selectedGroupCorresp.includes(value)}
                  onChange={() => handleCheckboxChangeCorresp(value)}
                />
                <Checkbox
                  checked={selectedGroupOther.includes(value)}
                  onChange={() => handleCheckboxChangeOther(value)}
                />
              </MenuItem>
            ))}
            </Select>
          </FormControl>
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
          label="Project" 
          type="search" 
          style={{ width: '27%', height: '40px',margin: '0'}} 
          value={project} 
          // onChange={handleProjectChange}
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
              <Button type="submit" variant="contained" color="primary" onClick={handleApiTest} style={{ width: '15%' }}>
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