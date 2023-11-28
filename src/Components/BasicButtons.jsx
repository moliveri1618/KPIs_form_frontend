import React, {useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import Button from '@mui/material/Button';
import axios from 'axios';


export default function BasicButtons() {
  const [inputValue, setInputValue] = useState('HelloooooOOoOoo');
  const [data, setData] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(event.target.value)
  };

  const handleApiTest = async () => {
    let api = ''
    try {
      if (process.env.NODE_ENV !== 'production') {
        api = 'http://' + process.env.REACT_APP_API_URL_DEV + '/stoca'
      } else {
        api = 'http://' + process.env.REACT_APP_API_URL_PROD + '/stoca'
      }
      const response = await axios.post(api);
      setData(response.data);
      console.log(response.data)
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    //console.log(data);
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
      <Avatar sx={{ bgcolor: '#006400', marginRight: '8px' }}>
        <AssignmentTurnedInRoundedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Doi Form
      </Typography>
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          // defaultValue="Hello World"
          value={inputValue}
          onChange={handleInputChange}
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Disabled"
          defaultValue="Hello World"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField id="outlined-search" label="Search field" type="search" />
        <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        />
      </div>
      <div>
        <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="Hello World"
          variant="filled"
        />
        <TextField
          disabled
          id="filled-disabled"
          label="Disabled"
          defaultValue="Hello World"
          variant="filled"
        />
        <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        <TextField
          id="filled-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <TextField
          id="filled-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        <TextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
        />
        <TextField
          id="filled-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="filled"
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button type="submit" variant="contained" color="primary" onClick={handleApiTest}>
          Test api
        </Button>
      </div>
      </div>
    </Box>
  );
}
