import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
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
  const [signInError, setSignInError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .post('/api/auth/signin', {
        username: data.get('username'),
        password: data.get('password')
      })
      .then(res => console.log(res.data))
      .catch(err => setSignInError(true));
  };

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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {signInError ? (
              <Typography variant="body2" color="error">
                <em>Incorrect username or password</em>
              </Typography>
            ) : null}
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
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
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