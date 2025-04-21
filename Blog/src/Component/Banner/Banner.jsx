import React from "react";
import { Box, Typography, styled } from '@mui/material';

const Image = styled(Box)`
  background: url(https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?t=st=1745132617~exp=1745136217~hmac=2e2d247ec0cc94746e687642ee43c9ebcb61a9f156f41c62642c8d7c251bafb6&w=1060) center/cover no-repeat #000;
  height: 40vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Heading = styled(Typography)(({ theme }) => ({
    fontSize: '70px',
    background: 'linear-gradient(135deg, #b0e0e6 0%, #4682b4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down('md')]: {
      fontSize: '48px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '36px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '28px',
    },
  }));
  

const SubHeading = styled(Typography)`
  font-size: 24px;
  background: linear-gradient(135deg, #0047ab 0%, #1ca9c9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  margin-top: 8px;
`;

const Banner = () => {
  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      <Image>
        <Heading>Bold Perspectives</Heading>
        <SubHeading>Blog</SubHeading>
      </Image>
    </Box>
  );
};

export default Banner;
