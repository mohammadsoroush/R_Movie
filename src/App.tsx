import React from "react";
import { Navbar } from "./Component/Navbar";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Movies } from "./Pages/Movies";
import { MovieDetail } from "./Pages/MovieDetail";


function App() {
  return (
    <React.Fragment>
    
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/moviesDetail/:id" element={<MovieDetail />} />
          <Route path="*" element={<Navigate to={"/"}/>}/>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
