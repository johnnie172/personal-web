import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { LOGIN_API } from "../../consts";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

const LoginForm = () => {
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(false);
  const [token, setToken, removeToken] = useCookies(["access_token"]);

  useEffect(() => {
    if (!error) return;
    console.log("error");
  }, [error]);

  const sendAuth = async (email: string, pass: string) => {
    try {
      const res = await axios({
        method: "POST",
        url: LOGIN_API,
        data: {
          email: email,
          password: pass,
        },
      });
      if (res.status == 200) {
        return res.data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  //TODO: this is test to delete
  const checkAuth = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://127.0.0.1:5000/jwt",
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.status == 200) {
        // return res.data;
        console.log(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // get form data
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const pass = data.get("password");
    if (!email || !pass) {
      alert("Please enter fields");
      return;
    }

    // send data to api and set or remove token
    (async () => {
      const token = await sendAuth(String(email), String(pass));
      if (token?.access_token) {
        setToken("access_token", token?.access_token);
        setError(false);
        return;
      }
      setError(true);
      removeToken("access_token");
    })();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            control={
              <Checkbox
                id="remember"
                value={remember}
                color="primary"
                onChange={() => setRemember(!remember)}
              />
            }
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
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
