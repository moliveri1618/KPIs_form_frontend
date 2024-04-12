import React, {useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Copyright from './CopyRight';
import logos from './Images/ibet_logo.png'


export default function FormFail() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [volume, setVolume] = useState('');
  const [issn, setISSN] = useState('');
  const [url, setUrl] = useState('');
  const [doi, setDoi] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  let res = {}

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
    validateForm(event.target.value, author, volume, issn, url);
  };

  const handleChangeAuthor= (event) => {
    setAuthor(event.target.value);
    validateForm(title, event.target.value, volume, issn, url);
  };

  const handleChangeVolume = (event) => {
    setVolume(event.target.value);
    validateForm(title, author, event.target.value, issn, url);
  };
  
  const handleChangeISSN = (event) => {
    setISSN(event.target.value);
    validateForm(title, author, volume, event.target.value, url);

  };
  
  const handleChangeUrl = (event) => {
    setUrl(event.target.value);
    validateForm(title, author, volume, issn, event.target.value);

  };
  

  const validateForm = (titleValue, authorValue,volumeValue,issnValue,urlValue,) => {
    const isValidForm = titleValue.trim() !== '' && authorValue.trim() !== '' && volumeValue.trim() !== '' && issnValue.trim() !== '' && urlValue.trim();
    setIsValid(isValidForm);
  };

  const notify = (varValue) => {
    toast.error(`${varValue} could not be found`, {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });

    toast.error(`Go back to change it or input data manually`, {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  const submit_success = () => {
    toast.success(`The information for this paper are successfully saved into the database 😍. You can close this window`, {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
  
  const handleApiTest = async (event) => {
    event.preventDefault();
    if (isValid) {
      res['title'] = title
      res['author'] = author
      res['volume'] = volume
      res['ISSN'] = issn
      res['url'] = url

      try {
        submit_success()
        setbuttonDisabled(true)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  useEffect(() => {

    // Get doi from url
    const url = window.location.href;
    const doiMatch = url.match(/DOI=([^&]+)/);
    console.log(doiMatch)
    if (doiMatch && doiMatch[1]) {
      setDoi(doiMatch[1]);
    }
    notify(doi)

    return () => {
      toast.dismiss(); 
    };
  }, []); 

  if (doi !== '') {
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
              Add Publication Details
            </Typography>
          </div>
          <div style={{ display: 'flex', 
                        gap: '10px',  
                        width: '100vw',  
                        justifyContent: 'center',
                        paddingTop: '40px', 
                        paddingBottom: '20px'}}> 
            <TextField id="a" label="Title" type="search" style={{ width: '40%', height: '40px',margin: '0'}} onChange={handleChangeTitle} required/>
            <TextField id="a" label="Author" type="search" style={{ width: '40%', height: '40px',margin: '0'}} onChange={handleChangeAuthor} required/>
          </div>
          <div style={{ display: 'flex', 
                        gap: '10px',  
                        width: '100vw',  
                        justifyContent: 'center',
                        paddingTop: '40px', 
                        paddingBottom: '60px'}}> 
            <TextField id="b" label="Volume" type="number" style={{ width: '26.5%', height: '40px',margin: '0'}} onChange={handleChangeVolume}/>
            <TextField id="c" label="Pages" type="number" style={{ width: '26%', height: '40px',margin: '0'}} onChange={handleChangeISSN}/>
            <TextField id="d" label="Year" type="search" style={{ width: '26.5%', height: '40px',margin: '0'}} onChange={handleChangeUrl}/>
          </div>
  
          <div style={{ display: 'flex', justifyContent: 'right', width: '83vw' }}>
            <Link to="/KPIs_form_frontend">
              <Button variant="contained" color="primary" style={{ width: '15%' }}>
                Back
              </Button>
            </Link>
            <Link>
              <Button variant="contained" color="primary" onClick={handleApiTest} disabled={buttonDisabled} style={{ width: '15%' }}>
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
        <Copyright sx={{ mt: 5 }} />
      </>
    );
  }
 
}
