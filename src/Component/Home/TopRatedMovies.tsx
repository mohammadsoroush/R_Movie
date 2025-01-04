import { Language } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

interface TopRatedType {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  original_language: string;
}
export const TopRatedMovies = () => {
  const [TopRated, SetTopRated] = React.useState<TopRatedType[]>([]);
  const [Page, SetPage] = React.useState<number>(1);


  const Fetch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${Page}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTJiYzNjNGNmMzVjY2UyMmRhODg3ZDdmNzZkNzQwZiIsIm5iZiI6MTczMjc3MjMxMi40NDMsInN1YiI6IjY3NDgwMWQ4MmY0M2IxNTBiOWIwODNhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S37GkiKR4Ja3MhEFNl7tIJ6JDZFOSo4TO_gsnxMQYkw`, // درست
            Accept: "application/json",
          },
        }
      );

      // console.log(response.data); // نمایش داده‌های دریافتی

      SetTopRated((prev) => [...prev, ...response.data.results]);
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    }
  };

  React.useEffect(() => {
    Fetch();
  }, [Page]);

  return (
    <Box
      sx={{
        p: "66px",
        maxWidth: "xl",
        overflowX: "hidden",

        "& .cards": {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "50px",
          mt: "30px",
        },

        "& .img": {
          width: "100%",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          transition: "all 0.5s linear",
          cursor: "pointer",

          "&:hover": {
            transform: "scale(1.05)",
          },
        },

        "& .card": {
          bgcolor: "#ffffff0a",
          borderRadius: "10px",
          border: "1px solid rgb(255 255 255 / 5%) ",
          textDecoration: "none",
          overflow: "hidden",
        },

        "& .MuiTypography-root": {
          color: "#e9c5c5",
          textAlign: "left",
          fontFamily: "Playfair Display, serif",
          fontSize: "16px",
        },
        "& .title-card": {
          fontSize: "25px",
          textAlign: "center",
          color: "#cece1d",
        },
        "& .title": {
          color: "#e7e7d5",
          textAlign: "left",
          fontSize: "18px",
        },

        "& .Loading-more-box": {
          display: "flex",
          justifyContent: "center",
        },
        "& .Loading-more-button": {
          color: "#d4d411",
          bgcolor: "black",
          transition: "all 0.2s linear",
          "&:hover": {
            transform: "scale(1.03)",
          },
        },
      }}
    >
      <Typography className="title-card" variant="h4">
        Top Rated Movies
      </Typography>
      <Box className="cards">
        {TopRated.length > 0 ? (
          TopRated.map((item, index) => (
            <Box
              component={Link}
              to={`/moviesDetail/${item.id}`}
              key={item.id}
              className="card"
            >
              <Box
                className="img"
                component="img"
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
              />

              <Box
                className="description"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <Typography className="title">{item.title}</Typography>
                <Divider
                  variant="fullWidth"
                  flexItem
                  sx={{
                    bgcolor: "rgb(255 255 255 / 11%)", // رنگ دلخواه
                  }}
                />
                <Typography>Rating: {item.vote_average}</Typography>
                <Typography>Language: {item.original_language}</Typography>
                <Typography>Release: {item.release_date}</Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="body1">Loading top-rated movies...</Typography>
        )}
      </Box>
      <Box className="Loading-more-box">
        <Button
          className="Loading-more-button"
          variant="contained"
          onClick={() => SetPage((prev) => prev + 1)}
        >
          Loading more ...
        </Button>
      </Box>
    </Box>
  );
};
