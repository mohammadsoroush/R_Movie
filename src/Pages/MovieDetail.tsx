import { Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Trailers } from "../Component/MovieDetails/Trailers";
import { SimilarMovie } from "../Component/MovieDetails/SimilarMovie";

interface MovieDetail {
  id: number;
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  release_date: string;
  tagline: string;
  overview: string;
  vote_average: number;
  original_language: string;
  genres: Array<{ id: number; name: string }>;
}

export const MovieDetail = () => {
  const [detail, setdetail] = React.useState<MovieDetail | null>(null);
  const { id } = useParams();

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTJiYzNjNGNmMzVjY2UyMmRhODg3ZDdmNzZkNzQwZiIsIm5iZiI6MTczMjc3MjMxMi40NDMsInN1YiI6IjY3NDgwMWQ4MmY0M2IxNTBiOWIwODNhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S37GkiKR4Ja3MhEFNl7tIJ6JDZFOSo4TO_gsnxMQYkw`, // کلید API خود را اینجا قرار دهید
            Accept: "application/json",
          },
        }
      );

      setdetail(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  React.useEffect(() => {
    fetchDetails();
  }, [id]);
  return (
    <>
      {detail && (
        <Box
          sx={{
            position: "relative",
            margin: "auto",
            width: "98%",
            "& .MuiTypography-root": {
              fontFamily: "Playfair Display, serif",
            },
            "& .inner-box": {
              alignItems: "end",
              display: "grid",
              gridTemplateColumns: "1fr 2.5fr",
              gap: "10px",
              position: "absolute",

              bottom: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0) 15%, rgba(0,0,0,0.8035) 48%, rgba(0,0,0,1) 92%)",
              p: "0 10px",
            },

            "& .img-box": {
              width: "100%",
            },
            "& .img": {
              width: "100%",
            },

            "& .poster-box": {
              width: { xs: "90%", md: "80%" },
            },
            "& .poster": {
              width: "100%",
              height: "100%",
              borderRadius: "14px",
            },
          }}
        >
          <Box className="img-box">
            <Box
              className="img"
              component="img"
              src={`https://image.tmdb.org/t/p/w1280${detail.backdrop_path}`}
            />
          </Box>

          <Box className="inner-box">
            <Box className="poster-box">
              <Box
                className="poster"
                component="img"
                src={`https://image.tmdb.org/t/p/w1280${detail.poster_path}`}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "5px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Typography
                  sx={{ color: "white", fontSize: { xs: "18px", lg: "22px" } }}
                >
                  {detail.original_title}
                </Typography>
                <Typography
                  sx={{ color: "white", fontSize: { xs: "18px", lg: "22px" } }}
                >
                  ({detail.release_date.split("-")[0]})
                </Typography>
              </Box>
              <Typography
                sx={{ color: "white", fontSize: { xs: "14px", lg: "18px" } }}
              >
                {detail.overview}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "row",
                    md: "column",
                  },
                  gap: { xs: "20px", lg: "0px" },
                }}
              >
                <Typography
                  sx={{ color: "white", fontSize: { xs: "14px", lg: "18px" } }}
                >
                  Genres:{" "}
                  {detail.genres.map((item, index) => item.name).join(", ")}
                </Typography>
                <Typography
                  sx={{ color: "white", fontSize: { xs: "14px", lg: "18px" } }}
                >
                  Rating: {detail.vote_average}
                </Typography>
                <Typography
                  sx={{ color: "white", fontSize: { xs: "14px", lg: "18px" } }}
                >
                  Language: {detail.original_language}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      <Trailers />
      <SimilarMovie />
    </>
  );
};
