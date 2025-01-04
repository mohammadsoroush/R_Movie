import { Search } from "@mui/icons-material";
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  Input,
  Modal,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface TopRatedType {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  original_language: string;
}

export const Navbar = () => {
  const [search, SetSearch] = React.useState("");
  const [movie, setmovie] = React.useState<TopRatedType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const Navigate = useNavigate();

  const handlesearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    SetSearch(value);

    if (value.length > 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  const Fetch_search = async () => {
    if (!search) {
      return;
    }
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTJiYzNjNGNmMzVjY2UyMmRhODg3ZDdmNzZkNzQwZiIsIm5iZiI6MTczMjc3MjMxMi40NDMsInN1YiI6IjY3NDgwMWQ4MmY0M2IxNTBiOWIwODNhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S37GkiKR4Ja3MhEFNl7tIJ6JDZFOSo4TO_gsnxMQYkw`, // درست
            Accept: "application/json",
          },
        }
      );
      setmovie(response.data.results);
    } catch (error) {}
  };

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (search) {
        document.documentElement.style.overflowY = "hidden"; // جلوگیری از اسکرول

        setLoading(true);
        Fetch_search();
      } else {
        document.documentElement.style.overflowY = "auto";
        setLoading(false);
        setmovie([]); // Clear movie results if input is empty
      }
    }, 400); // 300 milliseconds debounce time

    return () => {
      clearTimeout(handler); // Clear the timeout if the component unmounts or search changes
    };
  }, [search]);

  // React.useEffect(() => {
  //   if (loading) {
  //     document.documentElement.style.overflowY = "hidden"; // جلوگیری از اسکرول
  //   } else {
  //     document.documentElement.style.overflowY = "auto"; // بازگشت به حالت عادی

  //   }

  //   return () => {
  //     document.documentElement.style.overflowY = "auto"; // پاکسازی هنگام خروج از کامپوننت
  //   };
  // }, [loading]);

  const Go_To_Details = (id: number) => {
    document.documentElement.style.overflowY = "auto";
    setLoading(false);
    Navigate(`/moviesDetail/${id}`);
    setmovie([]);
    SetSearch("");
  };
  return (
    <>
      <AppBar
        sx={{
          bgcolor: "#262a2d",
          "&.MuiAppBar-root": { zIndex: "2000" },
          "& .MuiToolbar-root": {
            justifyContent: "space-around",
            alignItems: "center",
          },

          "& .logo_Explore": {
            display: "flex",
            gap: { xs: "20px", md: "40px" },
          },
          "& .logo": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#f8ec00",
            cursor: "pointer",
            textDecoration: "none",
          },

          "& .span_1": {
            fontSize: { xs: "14px", md: "18px" },
          },
          "& .span_2": {
            fontSize: { xs: "20px", md: "26px" },
          },
          "& .Explore": {
            textTransform: "capitalize",
            color: "#d2c219",
            fontSize: { xs: "14px", md: "18px" },
          },
          "& .MuiPaper-root": {
            display: "flex",
            alignItems: "center",
            padding: { xs: "2px", md: "6px" },
            borderRadius: "15px",
            gap: "13px",
            flexGrow: "0.5",
          },
          "& .MuiSvgIcon-root": {
            fontSize: { xs: "19px", md: "35px" },
          },
          "& .MuiInputBase-root": {
            flexGrow: "1",
          },
          "& .MuiInput-input": {
            fontSize: { xs: "13px", md: "17px" },
          },
        }}
      >
        <Toolbar>
          <Box className="logo_Explore">
            <Link to={"/"} className="logo">
              <span className="span_1">All About</span>
              <span className="span_2">Movies</span>
            </Link>

            <Link to="/movies">
              <Button className="Explore">Explore</Button>
            </Link>
          </Box>

          <Paper>
            <Search />
            <Input
              value={search}
              onChange={handlesearch}
              sx={{ fontFamily: "Playfair Display, serif" }}
              placeholder="Enter Movie Name..."
            />
          </Paper>
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Modal
        disableEnforceFocus
        disableAutoFocus
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            width: "100%",
            gap: "26px",
            m: "80px auto",
            pr: "24px",
            overflowY: "auto", // اضافه کردن اسکرول عمودی
            maxHeight: "100vh",
          }}
        >
          {movie.length > 0 &&
            movie.map((item, index) => (
              <Box
                onClick={() => Go_To_Details(item.id)}
                sx={{
                  border: "1px solid black",
                  backdropFilter: "brightness(0.1)",
                  borderRadius: "10px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "4/6",
                    borderTopRightRadius: "10px",
                    borderTopLeftRadius: "10px",
                    cursor:"pointer"
                  }}
                  component="img"
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                />
                <Typography>{item.title}</Typography>
              </Box>
            ))}
        </Box>
      </Modal>
    </>
  );
};
