import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from '../firebase/firebaseConfig';

import { Button, TextField, Typography, Paper, InputLabel, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const fetchUserData = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const collectionRef = collection(db, 'users');
      const querySnapshot = await getDocs(collectionRef);
      const fetchedUserData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        username: doc.data().username,
        password: doc.data().password,
      }));

      return fetchedUserData;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
  const storedUser = sessionStorage.getItem('loggedInUser');

  const handleBeforeUnload = async (event) => {
    if (storedUser) {
      await sessionStorage.setItem('loggedInUser', storedUser);
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  const tryAutoLogin = async () => {
    try {
      const userData = await fetchUserData();

      if (!userData) {
        console.error('Error fetching user data');
        return;
      }

      const storedUserObject = JSON.parse(storedUser);
      const foundUser = userData.find(
        (user) =>
          user.username.toLowerCase() === storedUserObject.username.toLowerCase() &&
          user.password === storedUserObject.password
      );

      if (foundUser) {
        onLogin();
      }
    } catch (error) {
      console.error('Error during auto-login:', error);
    }
  };

  if (storedUser) {
    tryAutoLogin();
  }

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, [onLogin]);

  const handleLogin = async () => {
    try {
      const userData = await fetchUserData();

      if (!userData) {
        console.error('Error fetching user data');
        return;
      }

      const foundUser = userData.find(
        (user) =>
          user.username.toLowerCase() === username.toLowerCase() &&
          user.password === password
      );

      if (foundUser) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));
        onLogin();
      } else {
        alert('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '90vh',
    }}>
      <Paper sx={{ padding: '1rem', maxWidth: '500px', margin: 'auto', margin: '1rem' }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ backgroundColor: '#0a3269', padding: '1rem', borderRadius: '0.5rem' }}>
          Basement Wale
        </Typography>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form>
          <InputLabel htmlFor="username">Username</InputLabel>
          <TextField
            id="username"
            variant="outlined"
            autoComplete="username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            inputProps={{ sx: { color: '#0a3269' } }}
            sx={{ backgroundColor: '#fffff7', borderRadius: '0.5rem'}}
          />
          <InputLabel htmlFor="password">Password</InputLabel>
          <TextField
            id="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            autoComplete="current-password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{ sx: { color: '#0a3269' } }}
            sx={{ backgroundColor: '#fffff7', borderRadius: '0.5rem'}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ color: '#0a3269' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            style={{ marginTop: '1rem' }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
