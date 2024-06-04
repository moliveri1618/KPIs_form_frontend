import React, {useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Copyright from './CopyRight';
import logos from './Images/ibet_logo.png'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';


export default function FormFail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [volume, setVolume] = useState('');
  const [pages, setPages] = useState('');
  const [year, setYear] = useState('');
  const [doi, setDoi] = useState(''); 
  const [isValid, setIsValid] = useState(false);
  const userName = location.state && location.state.userName;
  const userSurname = location.state && location.state.userSurname;
  let res = {}

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
    validateForm(event.target.value, author, volume, pages, year);
  };

  const handleChangeAuthor= (event) => {
    setAuthor(event.target.value);
    validateForm(title, event.target.value, volume, pages, year);
  };

  const handleChangeVolume = (event) => {
    setVolume(event.target.value);
    validateForm(title, author, event.target.value, pages, year);
  };
  
  const handleChangePages = (event) => {
    setPages(event.target.value);
    validateForm(title, author, volume, year);

  };
  
  const handleChangeYear = (event) => {
    setYear(event.target.value);
    validateForm(title, author, volume, pages, event.target.value);

  };

  const validateForm = (titleValue, 
                        authorValue,
                        volumeValue,
                        pagesValue,
                        yearValue,
                        ) => {
    const isValidForm = titleValue.trim() !== '' && authorValue.trim() !== '' && volumeValue.trim() !== '' && pagesValue.trim() !== '' && yearValue.trim() !== '';
    setIsValid(isValidForm);
  };

  const navigateToStart = () => {
    var url = `/KPIs_form_frontend/start`;
    navigate(url, { state: {  userName: userName, userSurname: userSurname}});
  }

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
      res['pages'] = pages
      res['year'] = year
      res['journal'] = "N/A"
      res['impact_factor'] = 0
      res['publisher'] = "N/A"
      res['research_groups_first'] = "N/A"
      res['research_groups_corresp'] = "N/A"
      res['research_groups_other'] = "N/A"
      res['projects'] = "N/A"
      res['citation_count'] = 0
      res['article_type'] = "N/A"
      res['url'] = doi

      try {
        let api = '/doi_post/'
        //let api = 'http://' + '127.0.0.1:8000' + `/doi_post/`
        console.log(res)
        axios.post(api, res, {
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
      let api = ''
      try {
        submit_success()
        setIsValid(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  useEffect(() => {
    // Get doi from url
    const url = window.location.href;
    const doiMatch = url.match(/DOI=([^&]+)/);
    let doi = ''
    if (doiMatch && doiMatch[1]) {
      doi = doiMatch[1];
      setDoi(doiMatch[1]);
    }
    notify(doi)

    // Cleanup function
    return () => {
      toast.dismiss(); // Dismiss any existing toasts when the component unmounts
    };
  }, []); 


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
          <Typography component="h1" variant="h3" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400, fontWeight: 'bold'  }}>
            Add paper to iBET KPIs
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
          <TextField id="c" label="Pages" type="number" style={{ width: '26%', height: '40px',margin: '0'}} onChange={handleChangePages}/>
          <TextField id="d" label="Year" type="number" style={{ width: '26.5%', height: '40px',margin: '0'}} onChange={handleChangeYear}/>
        </div>

        <div style={{ display: 'flex', justifyContent: 'right', width: '83vw' }}>
          <Button variant="contained" color="primary" style={{ marginRight: '5px', width:'100px' }} onClick={navigateToStart}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleApiTest} disabled={!isValid} style={{ marginRight: '20px', width:'100px'}}>
            Submit
          </Button>
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
