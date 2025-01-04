import { Box, Button, Divider, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { Link,useNavigate, useParams } from "react-router-dom";

interface TopRatedType {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  original_language: string;
}

export const SimilarMovie = () => {
  const [similar, setsimilar] = React.useState<TopRatedType[]>([]);
  const [Page, SetPage] = React.useState<number>(1);
  const navigate = useNavigate();
  const { id } = useParams();

  const Fetch_SimilarMovie = async () => {
    try {
      
        console.log(Page);
       
      const Response = await axios.get(
       
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${Page}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTJiYzNjNGNmMzVjY2UyMmRhODg3ZDdmNzZkNzQwZiIsIm5iZiI6MTczMjc3MjMxMi40NDMsInN1YiI6IjY3NDgwMWQ4MmY0M2IxNTBiOWIwODNhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S37GkiKR4Ja3MhEFNl7tIJ6JDZFOSo4TO_gsnxMQYkw`, // درست
            Accept: "application/json",
          },
        }
      );
     
      console.log(Response.data.results);
     
      
    //   setsimilar((prev) => [...prev, ...Response.data.results]);
    setsimilar((prev) => {
        const newSimilar = [...prev, ...Response.data.results];
        console.log("length" + newSimilar.length); // طول جدید آرایه را در اینجا مشاهده کنید
        return newSimilar;
      });
    

    } catch (error) {
      console.error("Error fetching similar movies:", error);
    }
  };

  React.useEffect(() => {
    if (id) {
      SetPage(1);       // بازنشانی مقدار Page به 1
      setsimilar([]);   // خالی کردن آرایه
      Fetch_SimilarMovie()
    }
  }, [id]);
  
  React.useEffect(() => {
    if (Page > 1) {
      Fetch_SimilarMovie(); // بارگذاری صفحه‌های بعدی
    }
  }, [Page]);
  

  const handleClick = (itemId: number) => {
   
    navigate(`/moviesDetail/${itemId}`); // Navigate to the movie detail page
  };
  return (
    <Box
      sx={{
        m: "10px 75px",
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
        "& .Title": {
          textAlign: "center",
          color: "yellow",
          fontWeight: "bolder",
          paddingBottom: "20px",
          fontSize: "30px",
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
          mt:"40px"
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
      <Typography className="Title">Similar Movie</Typography>

      <Box className="cards">
        {similar.length > 0 ? (
          similar.map((item, index) => (
            <Box
            // onClick={() => handleClick(item.id)}
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
          <Typography variant="body1">Loading Similar Movies...</Typography>
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
