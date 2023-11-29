import React, {useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
        <TextField id="a" label="DOI" type="search" style={{ width: '80%', height: '40px',margin: '0'}} />
      </div>
      <div style={{ display: 'flex', 
                    gap: '10px',  
                    width: '100vw',  
                    justifyContent: 'center',
                    paddingTop: '40px', 
                    paddingBottom: '20px'}}> 
        <TextField id="b" label="DOI" type="search" style={{ width: '26.5%', height: '40px',margin: '0'}} />
        <TextField id="c" label="DOI" type="search" style={{ width: '26%', height: '40px',margin: '0'}} />
        <TextField id="d" label="DOI" type="search" style={{ width: '26.5%', height: '40px',margin: '0'}} />
      </div>
      <div style={{ display: 'flex', 
                    gap: '10px',  
                    width: '100vw',  
                    justifyContent: 'center',
                    paddingTop: '40px', 
                    paddingBottom: '20px'}}> 
        <TextField id="e" label="DOI" type="search" style={{ width: '26.5%', height: '40px',margin: '0'}} />
        <TextField id="f" label="DOI" type="search" style={{ width: '26%', height: '40px',margin: '0'}} />
        <TextField id="g" label="DOI" type="search" style={{ width: '26.5%', height: '40px',margin: '0'}} />
      </div>
      <div style={{ display: 'flex', 
                    gap: '10px',  
                    width: '100vw',  
                    justifyContent: 'center',
                    paddingTop: '40px', 
                    paddingBottom: '60px'}}> 
        <TextField id="h" label="DOI" type="search" style={{ width: '26.5%', height: '40px',margin: '0'}} />
        <TextField id="i" label="DOI" type="search" style={{ width: '26%', height: '40px',margin: '0'}} />
        <TextField id="l" label="DOI" type="search" style={{ width: '26.5%', height: '40px',margin: '0'}} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'right', width: '80.5vw' }}>
        <Link to="/home">
          <Button variant="contained" color="primary" style={{ width: '15%' }}>
            Submit
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
