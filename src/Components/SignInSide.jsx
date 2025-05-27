import * as React from 'react';
import {useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from './CopyRight';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiOutlineCheck } from "react-icons/hi2";
import sign_in_pic from './Images/kpis_background.png'
import { ConstructionOutlined } from '@mui/icons-material';
import WarningBanner from './WarningBanner';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const allowed_users = {
  Ana_simplicio: 'anas@ibet.pt',
  Patricia_Gomes_Alves: 'palves@ibet.pt',
  Ana_Batista: 'abatista@ibet.pt',
  Nadia_Duarte: 'nadia.duarte@ibet.pt',
  Pedro_Cruz: 'pedro.cruz@ibet.pt',
  Teresa_Crespo: 'tcrespo@ibet.pt',
  Pedro_Matias: 'matias@ibet.pt',
  Rosario_Bronze: 'mbronze@ibet.pt',
  Vanessa_Pereira: 'vanessap@ibet.pt',
  Joao_Crespo: 'joao.crespo@itqb.unl.pt',
  Daniel_Simao: 'dsimao@ibet.pt',
  Tiago_Bandeiras: 'tiago.bandeiras@ibet.pt',
  Paula_Alves: 'alves@ibet.pt',
  Ines_Isidro: 'iaisidro@ibet.pt',
  Ana_Coroadinha: 'avalente@ibet.pt',
  Manuel_Carrondo: 'mjtc@ibet.pt',
  Teresa_Serra: 'tserra@ibet.pt',
  Cristina_Peixoto: 'peixoto@ibet.pt',
  Catarina_Brito: 'anabrito@ibet.pt',
  Antonio_Roldao: 'aroldao@ibet.pt',
  Margarida_serra: 'mserra@ibet.pt',
  Mauro_oliveri: 'mauro.oliveri@ibet.pt'
};

export default function SignInSide() {

  const navigate = useNavigate();
  const [flagSuccess, setFlagSuccess] = useState(0); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const isFormValid = email !== '' && password !== '';

  const notify = (message) => {
    toast.error('Error: ' + message, {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });

    // Prepare the JSON data
    const userData = {
      email: data.get('email'),
      password: data.get('password')
    };

    // Check if email from userData is in allowed_users
    const emailExists = Object.values(allowed_users).includes(userData.email);
    if (emailExists) {
      let api = ''
      try {
          //api = 'http://' + process.env.REACT_APP_API_URL_DEV + `/login/`
          //api = `/login/`;
          api = "http://172.17.231.51:8080/login/"
          axios.post(api, userData)
            .then(response => {
              console.log(response)
              if (response.statusText === 'OK') {
                setFlagSuccess(1)
                setTimeout(() => {
                  var url = `/KPIs_form_frontend/start`;
                  navigate(url, { state: { userName: response.data['name'], userSurname: response.data['surname'] } });
                }, 1500); // 3000 milliseconds = 3 seconds
            
              } 
            })

          //api = 'http://' + process.env.REACT_APP_API_URL_DEV + `/check_pws_ms_AD/`
          // api = '/check_pws_ms_AD/';
          // axios.post(api, userData)
          //   .then(response => {

          //     if (response.statusText === 'OK') {
          //       setFlagSuccess(1)
          //       setTimeout(() => {
          //         var url = `/KPIs_form_frontend/start`;
          //         navigate(url, { state: { userName: response.data['name'], userSurname: response.data['surname'] } });
          //       }, 1500); // 3000 milliseconds = 3 seconds
            
          //     } 
          //   })
          //   .catch(error => {
          //     console.error(error.response.data['message']);
          //     notify(error.response.data['message'])
          //   });
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      notify('Access not authorized: Email is not allowed')
    }
  };
 //yoyoyyo
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${sign_in_pic})`, 
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <WarningBanner />
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h2" sx={{ mb: 12, mt: 5, fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: '#2E8BC0', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', fontStyle: 'italic' }}>
              iBET Papers KPIs App
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              {flagSuccess === 0 && (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!isFormValid}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              )}
              {flagSuccess === 1 && (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  <HiOutlineCheck style={{ fontSize: '22px' }}/>
                </Button>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">

                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}