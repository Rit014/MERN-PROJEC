import React, { useState } from 'react';
import Login from './Component/Login';
import { ThemeProvider, CssBaseline, Box, IconButton } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { DarkMode, LightMode } from '@mui/icons-material';
import DataProvider from './context/DataProvider';
import Home from './Component/Home/Home';
import Header from './Component/Header/Header';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import CreatePost from './Component/Create/CreatePost';
import DetailView from './Component/details/DetailView';
import UpdatePost from './Component/Create/UpdatePost';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AboutPage from './Component/About/AboutPage';
import ContactPage from './Component/Contact/ContactPage';

const PrivateRoute = ({ isAuthenticated, darkMode, setDarkMode }) => {
  return isAuthenticated ? (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Outlet />
    </>
  ) : (
    <Navigate replace to='/login' />
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, isuserAuthenticated] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          minWidth: '100vw',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          color: 'text.primary',
          overflow: 'hidden',
        }}
      >
        <DataProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Login isuserAuthenticated={isuserAuthenticated} darkMode={darkMode} setDarkMode={setDarkMode} />} />
              <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} darkMode={darkMode} setDarkMode={setDarkMode} />}>
                <Route path='/' element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
              </Route>
              <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} darkMode={darkMode} setDarkMode={setDarkMode} />}>
                <Route path='/create' element={<CreatePost darkMode={darkMode} setDarkMode={setDarkMode} />} />
              </Route>
              <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} darkMode={darkMode} setDarkMode={setDarkMode} />}>
                <Route path='/details/:id' element={<DetailView darkMode={darkMode} setDarkMode={setDarkMode} />} />
              </Route>
              <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} darkMode={darkMode} setDarkMode={setDarkMode} />}>
                <Route path='/update/:id' element={<UpdatePost darkMode={darkMode} setDarkMode={setDarkMode} />} />
              </Route>
              {/* <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} darkMode={darkMode} setDarkMode={setDarkMode} />}>
                <Route path='/about' element={<AboutPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
              </Route>
              <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} darkMode={darkMode} setDarkMode={setDarkMode} />}>
                <Route path='/contact' element={<ContactPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
              </Route> */}
            </Routes>
          </BrowserRouter>

          <ToastContainer position="top-right" autoClose={3000} />
        </DataProvider>
      </Box>
    </ThemeProvider>
  );
};

export default App;
