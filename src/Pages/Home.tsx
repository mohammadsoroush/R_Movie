import React from "react";
import { HomeSlider } from "../Component/Home/HomeCarousel";
import { TopRatedMovies } from "../Component/Home/TopRatedMovies";


export const Home = () => {
  return (
    <div>
      <HomeSlider />
      <TopRatedMovies/>
    </div>
  );
};
