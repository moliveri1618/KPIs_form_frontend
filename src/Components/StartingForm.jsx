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



export default function StartingForm() {
  const [data, setData] = useState(null);
  const [group, setGroup] = React.useState('');
  const [doi, setDoi] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isValidDoi, setIsValidDoi] = useState(true);
  const groups = ['Group1', 'Group2', 'Group3'];
  const navigate = useNavigate();

  const isValidDOI = (doi) => {
    // Define the regular expression pattern for a valid DOI
    const doiPattern = /^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;
  
    // Test the DOI against the pattern
    return doiPattern.test(doi);
  };

  const handleChange = (event) => {
    setGroup(event.target.value);
    validateForm(event.target.value, doi);

  };

  const handleDoiChange = (event) => {
    setDoi(event.target.value);
    setIsValidDoi(isValidDOI(event.target.value));
    validateForm(group, event.target.value);
  };

  const validateForm = (groupValue, doiValue) => {
    const isValidForm = groupValue.trim() !== '' && doiValue.trim() !== '';
    setIsValid(isValidForm);
  };

  const handleApiTest = async (event) => {
    event.preventDefault();
    let timeoutReached = false;
    const timeoutId = setTimeout(() => {
      console.log('Timeout completed!'); // Change the message after the timeout
    }, 1000000);
    if (isValid && isValidDoi) {
      let api = ''
      try {
          api = 'https://' + process.env.REACT_APP_API_URL_DEV + `/stoca?DOI=${doi}`
          console.log(api)
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

    console.log(data);
    if (data !== null) {
      if (data === 'No DOIs found') {
        var url = `/KPIs_form_frontend/fail?DOI=${doi}`;
        navigate(url);
      } else {
        console.log(data)
        var url = `/KPIs_form_frontend/success`;
        navigate(url, { state: { data } });
      }
    }

  }, [data]); // Dependency array ensures this effect runs only when 'data' changes


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
          Submit your DOI
        </Typography>
      </div>
      <div style={{ display: 'flex', 
                    gap: '10px',  
                    width: '100vw',  
                    justifyContent: 'center',
                    paddingTop: '40px', 
                    paddingBottom: '60px'}}> 
        <FormControl fullWidth style={{ width: '40%' }}>
          <InputLabel id="demo-simple-select-label">Groups *</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={group}
            label="Group"
            onChange={handleChange}
          >
          {groups.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
        <TextField 
        id="outlined-search" 
        label="DOI *" 
        type="search" 
        style={{ width: '40%', height: '40px',margin: '0'}} 
        value={doi} 
        onChange={handleDoiChange}
        error={!isValidDoi}
        helperText={
            <>
                <Typography variant="body2" component="span">
                    Example:
                </Typography>
                {' '}
                <Typography variant="body2" component="span" style={{ fontWeight: 'bold' }}>
                    10.1016/j.carbpol.2016.01.046
                </Typography>
            </>
        }
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'right', width: '83.5vw' }}>
        <Link to="/home">
          <Button type="submit" variant="contained" color="primary" onClick={handleApiTest} style={{ width: '15%' }}>
            Submit
          </Button>
        </Link>
      </div>
    </Box>
  );
}
