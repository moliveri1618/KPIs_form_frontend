import React, {useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function FormFail() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [volume, setVolume] = useState('');
  const [issn, setISSN] = useState('');
  const [url, setUrl] = useState('');
  const [number, setNumber] = useState('');
  const [journal, setJournal] = useState('');
  const [publisher, setPublisher] = useState('');
  const [pages, setPages] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  let res = {}

  const [isValid, setIsValid] = useState(false);
  const [buttonDisabled, setbuttonDisabled] = useState(false);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
    validateForm(event.target.value, author, volume, issn, url, number, journal, publisher, pages, year, month);
  };

  const handleChangeAuthor= (event) => {
    setAuthor(event.target.value);
    validateForm(title, event.target.value, volume, issn, url, number, journal, publisher, pages, year, month);
  };

  const handleChangeVolume = (event) => {
    setVolume(event.target.value);
    validateForm(title, author, event.target.value, issn, url, number, journal, publisher, pages, year, month);
  };
  
  const handleChangeISSN = (event) => {
    setISSN(event.target.value);
    validateForm(title, author, volume, event.target.value, url, number, journal, publisher, pages, year, month);

  };
  
  const handleChangeUrl = (event) => {
    setUrl(event.target.value);
    validateForm(title, author, volume, issn, event.target.value, number, journal, publisher, pages, year, month);

  };
  
  const handleChangeNumber = (event) => {
    setNumber(event.target.value);
    validateForm(title, author, volume, issn, url, event.target.value, journal, publisher, pages, year, month);

  };
  
  const handleChangeJournal = (event) => {
    setJournal(event.target.value);
    validateForm(title, author, volume, issn, url, number, event.target.value, publisher, pages, year, month);

  };
  
  const handleChangePublisher = (event) => {
    setPublisher(event.target.value);
    validateForm(title, author, volume, issn, url, number, journal, event.target.value, pages, year, month);

  };
  
  const handleChangePages = (event) => {
    setPages(event.target.value);
    validateForm(title, author, volume, issn, url, number, journal, publisher, event.target.value, year, month);

  };
  
  const handleChangeYear = (event) => {
    setYear(event.target.value);
    validateForm(title, author, volume, issn, url, number, journal, publisher, pages, event.target.value, month);

  };
  
  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
        validateForm(title, author, volume, issn, url, number, journal, publisher, pages, year, event.target.value);

  };

  const validateForm = (titleValue, 
                        authorValue,
                        volumeValue,
                        issnValue,
                        urlValue,
                        numberValue,
                        journalValue,
                        publisherValue,
                        pagesValue,
                        yearValue,
                        monthValue
                        ) => {
    const isValidForm = titleValue.trim() !== '' && authorValue.trim() !== '' && volumeValue.trim() !== '' && issnValue.trim() !== '' && urlValue.trim() !== '' && numberValue.trim() !== '' && journalValue.trim() !== '' && publisherValue.trim() !== '' && pagesValue.trim() !== '' && yearValue.trim() !== '' && monthValue.trim() !== '';
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
      res['number'] = number
      res['journal'] = journal
      res['publisher'] = publisher
      res['pages'] = pages
      res['year'] = year
      res['month'] = month
      console.log(res)
      let api = ''
      try {
        // if (process.env.NODE_ENV !== 'production') {
        //   api = 'http://' + process.env.REACT_APP_API_URL_DEV + '/manual_submission'
        // } else {
        //   api = 'http://' + process.env.REACT_APP_API_URL_PROD + '/manual_submission'
        // }
        //const response = axios.post(api)
        submit_success()
        setbuttonDisabled(true)
        // add dialog pop up saying: 
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
    }
    notify(doi)

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
        <TextField id="a" label="Title" type="search" style={{ width: '40%', height: '40px',margin: '0'}} onChange={handleChangeTitle} required/>
        <TextField id="a" label="Author" type="search" style={{ width: '40%', height: '40px',margin: '0'}} onChange={handleChangeAuthor} required/>
      </div>
      <div style={{ display: 'flex', 
                    gap: '10px',  
                    width: '100vw',  
                    justifyContent: 'center',
                    paddingTop: '40px', 
                    paddingBottom: '20px'}}> 
        <TextField id="b" label="Volume" type="number" style={{ width: '26.5%', height: '40px',margin: '0'}} onChange={handleChangeVolume} required/>
        <TextField id="c" label="ISSN" type="number" style={{ width: '26%', height: '40px',margin: '0'}} onChange={handleChangeISSN} required/>
        <TextField id="d" label="Url" type="search" style={{ width: '26.5%', height: '40px',margin: '0'}} onChange={handleChangeUrl} required/>
      </div>
      <div style={{ display: 'flex', 
                    gap: '10px',  
                    width: '100vw',  
                    justifyContent: 'center',
                    paddingTop: '40px', 
                    paddingBottom: '20px'}}> 
        <TextField id="e" label="Number" type="number" style={{ width: '26.5%', height: '40px',margin: '0'}} onChange={handleChangeNumber} required/>
        <TextField id="f" label="Journal" type="search" style={{ width: '26%', height: '40px',margin: '0'}} onChange={handleChangeJournal} required/>
        <TextField id="g" label="Publisher" type="search" style={{ width: '26.5%', height: '40px',margin: '0'}} onChange={handleChangePublisher} required/>
      </div>
      <div style={{ display: 'flex', 
                    gap: '10px',  
                    width: '100vw',  
                    justifyContent: 'center',
                    paddingTop: '40px', 
                    paddingBottom: '60px'}}> 
        <TextField id="h" label="Pages" type="number" style={{ width: '26.5%', height: '40px',margin: '0'}} onChange={handleChangePages} required/>
        <TextField id="i" label="Year" type="number" style={{ width: '26%', height: '40px',margin: '0'}} onChange={handleChangeYear} required/>
        <TextField id="l" label="Month" type="number" style={{ width: '26.5%', height: '40px',margin: '0'}} onChange={handleChangeMonth} required/>
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
  );
}
