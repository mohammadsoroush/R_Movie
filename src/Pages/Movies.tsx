import { Box, Button, Divider, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface TopRatedType {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  original_language: string;
}
const Moives_Array = [
  { Name: "Now Playing", Path: "now_playing", Page: 1 },
  { Name: "Popular", Path: "popular", Page: 1 },
  { Name: "Top Rated", Path: "top_rated", Page: 1 },
  { Name: "UpComing", Path: "upcoming", Page: 1 },
];

export const Movies = () => {
  const Navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [error, setError] = React.useState<string>("");
  const [NowPlaying, SetNowPlaying] = React.useState<TopRatedType[]>([]);
  const [Popular, SetPopular] = React.useState<TopRatedType[]>([]);
  const [TopRated, SetTopRated] = React.useState<TopRatedType[]>([]);
  const [UpComing, SetUpComing] = React.useState<TopRatedType[]>([]);
  const [Is_Page_Change, Set_Is_Page_Change] = React.useState<boolean>(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const currentMovies = [NowPlaying, Popular, TopRated, UpComing][value];

  const Fetch = async (value: number) => {
    try {
      if (currentMovies.length > 0 && !Is_Page_Change) {
        return;
      } else {
        Set_Is_Page_Change(false);
      }

      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${Moives_Array[value].Path}?language=en-US&page=${Moives_Array[value].Page}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTJiYzNjNGNmMzVjY2UyMmRhODg3ZDdmNzZkNzQwZiIsIm5iZiI6MTczMjc3MjMxMi40NDMsInN1YiI6IjY3NDgwMWQ4MmY0M2IxNTBiOWIwODNhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S37GkiKR4Ja3MhEFNl7tIJ6JDZFOSo4TO_gsnxMQYkw",
            Accept: "application/json",
          },
        }
      );

      switch (value) {
        case 0:
          SetNowPlaying((prevMovies) => [
            ...prevMovies,
            ...response.data.results,
          ]);
          break;
        case 1:
          SetPopular((prevMovies) => [...prevMovies, ...response.data.results]);
          break;
        case 2:
          SetTopRated((prevMovies) => [
            ...prevMovies,
            ...response.data.results,
          ]);
          break;
        case 3:
          SetUpComing((prevMovies) => [
            ...prevMovies,
            ...response.data.results,
          ]);
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data."); // نمایش پیام خطا
    }
  };

  React.useEffect(() => {
    Fetch(value);
  }, [value, Is_Page_Change]);

  const handlePage = () => {
    Moives_Array[value].Page += 1;
    Set_Is_Page_Change(true);
  };

  const Go_To_Details = (id: number) => {
    Navigate(`/moviesDetail/${id}`);
  };

  return (
    <Box
      sx={{
        "& .title-box": {
          display: "flex",
          justifyContent: "center",
          "& .title": {
            color: "yellow",
          },
        },
        "& .MuiTabs-flexContainer": {
          justifyContent: "space-evenly",
        },
        "& .MuiButtonBase-root.MuiTab-root": {
          color: "rgb(202 170 195)",
          textTransform: "capitalize",
          cursor: "pointer",
          fontSize: "18px",
        },
        "& .MuiButtonBase-root.MuiTab-root.Mui-selected": {
          color: "#ffffff",
        },
        "& .MuiTabs-indicator": {
          bgcolor: "#d21919",
        },

        "& .cards": {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "80px",
          p: "0 75px",
        },

        "& .img": {
          width: "100%",
          aspectRatio: "7/9",
        },
        "& .Tabs-box": {
          p: "50px 0",
        },

        "& .card": {
          bgcolor: "#ffffff0a",
          borderRadius: "10px",
          border: "1px solid rgb(255 255 255 / 5%) ",
          cursor: "pointer",
          overflow: "hidden",
        },
        "& .description": {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "10px",
        },

        "& .MuiTypography-root": {
          fontFamily: "Playfair Display, serif",
          color: "#cfc7ba",
        },
        "& .title": {
          color: "#e7e7d5",
          textAlign: "left",
          fontSize: "18px",
        },
        "& .Loading-more-box": {
          display: "flex",
          justifyContent: "center",
          p: "25px 10px",
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
      <Box className="title-box">
        <Typography className="title" variant="h4">
          Explore Movies
        </Typography>
      </Box>

      <Box className="Tabs-box">
        <Tabs value={value} onChange={handleChange}>
          {Moives_Array.map((movie, index) => (
            <Tab key={index} label={movie.Name} />
          ))}
        </Tabs>
      </Box>

      <Box className="cards">
        {currentMovies.map((item, index) => (
          <Box
            onClick={() => Go_To_Details(item.id)}
            key={item.id}
            className="card"
          >
            <Box
              component="img"
              className="img"
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            />

            <Box className="description" sx={{}}>
              <Typography className="title">{item.title}</Typography>
              <Divider
                variant="fullWidth"
                flexItem
                sx={{
                  bgcolor: "rgb(255 255 255 / 11%)",
                }}
              />
              <Typography>Rating: {item.vote_average}</Typography>
              <Typography>Language: {item.original_language}</Typography>
              <Typography>Release: {item.release_date}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box className="Loading-more-box">
        <Button
          className="Loading-more-button"
          variant="contained"
          onClick={handlePage}
        >
          Loading more ...
        </Button>
      </Box>
    </Box>
  );
};
