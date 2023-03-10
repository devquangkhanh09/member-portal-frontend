import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.facebook.com/BDCofHCMUT">
        Big Data Club
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function SignIn() {
  useEffect(() => {
    if (localStorage.getItem('isRememberMe') === 'true' && localStorage.getItem('jwt') && localStorage.getItem('jwt') !== '')
      setRedirect(true);
  }, []);

  const [username, setUserName] = useState('');
  const [password, setPassWord] = useState('');
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/auth/signin', {
        username,
        password,
      }, {
        headers: { 
          'Accept': 'application/json'
      }});
  
      localStorage.setItem('isRememberMe', isRememberMe? 'true':'false');
      localStorage.setItem('jwt', response.data.token);
      setRedirect(true);
    } catch (err: any) {
      console.log(err);
      if (err.response.status === 401) setErrorMessage('Incorrect username or password!');
      else setErrorMessage(err.message);
    }
  };
  if (redirect) {
    return <Navigate to='/profile' />
  }
  return (
    <div style={{backgroundImage: "-webkit-linear-gradient( 0deg, rgba(0, 0, 12, 0.9) 0%, hsla(0, 0%, 100%, 0.10) 100%), url('https://raw.githubusercontent.com/anduc146khmt/instruction-demo/master/img/IMG_1423.jpg')", backgroundSize: "cover",   width: "100%", height: "100%", left: 0,
    top: 0, position: "fixed" }}>
      <Container maxWidth="xs" >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: "400px",
            margin: "100px auto", 
            padding: "50px 30px", 
            background: "rgba(255, 255, 255, 0.75)",
            borderRadius: "40px",
          }}
        >
          <img src="https://raw.githubusercontent.com/anduc146khmt/instruction-demo/master/img/BIG%20DATA%20CLUB_logo.png" alt="logo" style={{width: "100px", height: "100px"}}/>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography color="red">
            {errorMessage}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={e=> setUserName(e.target.value)}
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
              onChange={e=> setPassWord(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox color="primary"
                onChange={e => setIsRememberMe(e.target.checked)} />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" style={{textDecoration: 'none'}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" style={{textDecoration: 'none'}}>
                  {"Contact Us"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </div>
  );
}