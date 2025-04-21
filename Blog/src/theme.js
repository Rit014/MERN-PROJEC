import React from 'react';
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#B9D9EB',
        },
        background: {
            default: '#ffffff',
            paper: '#f5f5f5',
        }
    },
    text: {
        primary: '#000000',
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#B9D9EB',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
        },
    },
});