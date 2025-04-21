import React from "react";
import Banner from "../Banner/Banner";
import Categories from "./Categories";
import Posts from "./post/Posts";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <Banner />

      {/* Categories section shown on top */}
      <Box sx={{ mt: 2, px: 2 }}>
        <Categories />
      </Box>

      {/* Posts shown below the categories */}
      <Box sx={{ mt: 4, px: 2 }}>
        <Posts />
      </Box>
    </>
  );
};

export default Home;
