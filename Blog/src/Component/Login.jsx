import React, { useState, useContext } from 'react';
import { Box, Button, TextField, Typography, styled, useTheme } from '@mui/material';
import { jwtDecode } from "jwt-decode";
import API from '../service/api';
import { DataContext } from '../context/DataProvider';
import { useNavigate } from 'react-router-dom';
import { DarkMode, LightMode } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const Container = styled(Box)`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Component = styled(Box)(({ theme }) => ({
    width: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    boxShadow:
        theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.1) 1.95px 1.95px 2.6px"
            : "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    textAlign: "center",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
}));

const Logo = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  gap: 2px;
`;

const Wrapper = styled(Box)`
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  & > div, & > button, & > p {
      margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  margin-top: 20px;
  padding: 10px 0;
  background: linear-gradient(135deg, #b0e0e6 0%, #4682b4 100%);
  color: white;
  font-weight: 600;
  border-radius: 30px;
  text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
  background: linear-gradient(135deg, #0047ab 0%, #1ca9c9 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(28, 169, 201, 0.4);
}

`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const SignUpButton = styled(Button)`
  margin-top: 20px;
  padding: 10px 0;
  background: linear-gradient(135deg, #b0e0e6 0%, #4682b4 100%);
  color: white;
  font-weight: 600;
  border-radius: 30px;
  text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

 &:hover {
  background: linear-gradient(135deg, #0047ab 0%, #1ca9c9 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(28, 169, 201, 0.4);
}

`;


const loginInitialValues = {
    identifier: '',
    password: '',
};

const signupInitialValues = {
    name: '',
    username: '',
    email: '',
    password: ''
};

const Login = ({ isuserAuthenticated, darkMode, setDarkMode }) => {
    const theme = useTheme();
    const [account, toggleAccount] = useState('login');
    const [signUp, setSignUp] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');

    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignUp = () => {
        toggleAccount(account === 'signup' ? 'login' : 'signup');
    };

    const onInputChange = (e) => {
        setSignUp({ ...signUp, [e.target.name]: e.target.value });
    };

    const signupUser = async () => {
        // Validate input fields
        if (!signUp.name || !signUp.username || !signUp.email || !signUp.password) {
            setError("All fields are required!");
            return;
        }

        let response = await API.userSignup(signUp);
        if (response.isSuccess) {
            setError('');
            setSignUp(signupInitialValues);
            toggleAccount('login');
        } else {
            setError("Something went wrong! Please try again later.");
        }
    };

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        // Validate input fields
        if (!login.identifier || !login.password) {
            setError("Username/Email and Password are required!");
            return;
        }

        let response = await API.userLogin(login);
        if (response.isSuccess) {
            setError('');
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);

            setAccount({ username: response.data.username, name: response.data.name });
            isuserAuthenticated(true);
            navigate('/');
            // Decode the token to get user details
            const decodedToken = jwtDecode(response.data.accessToken);
            console.log("User Details:", decodedToken);
        } else {
            setError('Something went wrong! Please try again later.');
        }
    };

    return (
        <Container>
            {/* Dark Mode Toggle */}
            <IconButton
                onClick={() => setDarkMode(!darkMode)}
                sx={{ position: "absolute", top: 20, right: 20 }}
            >
                {darkMode ? (
                    <DarkMode sx={{ color: "#FFDD44" }} />
                ) : (
                    <LightMode sx={{ color: "#FFA500" }} />
                )}
            </IconButton>

            <Component>
                <Logo>
                    <Typography variant="caption" component="p">
                        Dive into the
                    </Typography>
                    <Typography variant="h3" component="h4">
                        blogo<span style={{ color: theme.palette.primary.main }}>sphere</span>
                    </Typography>
                </Logo>

                {account === "login" ? (
                    <Wrapper>
                        <TextField
                            variant="standard"
                            value={login.identifier || ''}
                            onChange={onValueChange}
                            name="identifier"
                            label="Enter Username or Email"
                        />
                        <TextField
                            variant="standard"
                            type="password"
                            value={login.password || ''}
                            onChange={onValueChange}
                            name="password"
                            label="Enter Password"
                        />
                        {error && <Error>{error}</Error>}
                        <LoginButton onClick={loginUser} variant="contained">Login</LoginButton>
                        <Typography style={{ textAlign: "center" }}>OR</Typography>
                        <SignUpButton variant="text" onClick={toggleSignUp}>Create an account</SignUpButton>
                    </Wrapper>
                ) : (
                    <Wrapper>
                        <TextField
                            variant="standard"
                            value={signUp.name || ''}  // Ensure it is always defined
                            onChange={onInputChange}
                            name="name"
                            label="Enter Name"
                        />

                        <TextField
                            variant="standard"
                            value={signUp.username || ''}  // Ensure it is always defined
                            onChange={onInputChange}
                            name="username"
                            label="Enter Username"
                        />

                        <TextField
                            variant="standard"
                            value={signUp.email || ''}  // Ensure it is always defined
                            onChange={onInputChange}
                            name="email"
                            label="Enter Email"
                        />

                        <TextField
                            variant="standard"
                            type="password"
                            value={signUp.password || ''}  // Ensure it is always defined
                            onChange={onInputChange}
                            name="password"
                            label="Enter Password"
                        />
                        {error && <Error>{error}</Error>}
                        <SignUpButton onClick={signupUser} variant="contained">Sign Up</SignUpButton>
                        <Typography style={{ textAlign: "center" }}>OR</Typography>
                        <Typography style={{ textAlign: 'center' }}>
                            Already have an account?{' '}
                            <span
                                onClick={toggleSignUp}
                                style={{
                                    color: '#1976d2',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                }}
                            >
                                Login
                            </span>
                        </Typography>

                    </Wrapper>
                )}
            </Component>
        </Container>
    );
};

export default Login;
