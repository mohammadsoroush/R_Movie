import { Box, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { ThumbUp } from "@mui/icons-material";
import { HomeCarouselList } from "./HomeCarouselList";
import { useNavigate } from "react-router-dom";

export const HomeSlider = () => {
  interface CarouselItem {
    id: number; // اضافه کردن شناسه یکتا
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    vote_count: number;
  }

  const [Carousel, SetCarousel] = React.useState<CarouselItem[]>([]);
  const [error, setError] = React.useState<string | null>(null); // مدیریت خطا
  const Navigate = useNavigate();

  const Fetch_API = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTJiYzNjNGNmMzVjY2UyMmRhODg3ZDdmNzZkNzQwZiIsIm5iZiI6MTczMjc3MjMxMi40NDMsInN1YiI6IjY3NDgwMWQ4MmY0M2IxNTBiOWIwODNhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S37GkiKR4Ja3MhEFNl7tIJ6JDZFOSo4TO_gsnxMQYkw",
            Accept: "application/json",
          },
        }
      );
      SetCarousel(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data."); // نمایش پیام خطا
    }
  };

  React.useEffect(() => {
    Fetch_API();
  }, []);

  React.useEffect(() => {
    if (Carousel.length > 0) {
      handleSwiperInit(); // فراخوانی تابع زمانی که Carousel بارگذاری می‌شود
    }
  }, [Carousel]); // وقتی Carousel تغییر می‌کند، تابع فراخوانی می‌شود

  interface ListItem {
    img: string;
    title: string;
    describe: string;
    vote: number;
    id: number;
  }

  const [list, setList] = React.useState<ListItem[]>([]);

  const handleSlideChange = (swiper: SwiperType) => {
    const newList = Array.from({ length: 3 }, (_, i) => {
      const currentIndex = (swiper.activeIndex + (i + 1)) % Carousel.length;
      const item = Carousel[currentIndex];
      return item
        ? {
            img: item.backdrop_path,
            title: item.title,
            describe: item.overview,
            vote: item.vote_count,
            id: item.id,
          }
        : { img: "", title: "", describe: "", vote: 0, id: 0 }; // مدیریت حالت خالی
    });

    setList(newList);
  };

  const handleSwiperInit = () => {
    if (Carousel.length === 0) return;

    const initialList = Array.from({ length: 3 }, (_, i) => {
      const item = Carousel[i + 1]; // از داده‌های اولیه Carousel استفاده کنید

      return item
        ? {
            img: `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`,
            title: item.title,
            describe: item.overview,
            vote: item.vote_count,
            id: item.id,
          }
        : { img: "", title: "", describe: "", vote: 0, id: 0 }; // مقادیر پیش‌فرض
    });

    setList(initialList);
  };

  const Go_To_Details = (id: number) => {
    Navigate(`/moviesDetail/${id}`);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(500px,1fr)",
          lg: "minmax(500px,2fr) minmax(200px,1fr)",
        }, // به جای width
        gap: "21px",
        overflowX: "hidden",
        width: "95%",
        m: "auto",

        "& .Carousel": {},
        "& .backdrop_path": {
          width: "100%",
          height: "100%",
          objectFit: "fill",
          borderRadius: "20px",
        },
        "& .swiper": {
          height: "100%",
        },
        "& .SwiperSlide": {
          position: "relative",
          cursor: "pointer",
        },
        "& .poster_path": {
          // position: "absolute",
          bottom: 0,
          left: "47px",
          width: { xs: "30%", md: "20%" },
          zIndex: "1",
          borderRadius: "34px",
        },
        "& .Dark-layout": {
          width: "100%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25) 25%, rgba(0,0,0,1) 92%)",
          position: "absolute",
          bottom: 0,
          height: "30%",

          borderBottomRightRadius: "20px",
          borderBottomLeftRadius: "20px",
        },
        "& .description": {
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 15%, rgba(0,0,0,0.8035) 48%, rgba(0,0,0,1) 92%)",
          display: "flex",
          position: "absolute",
          bottom: "0",
          alignItems: { xs: "flex-end", md: "center" },
          gap: "54px",
          padding: "23px",
          borderBottomRightRadius: "20px",
          borderBottomLeftRadius: "20px",
        },

        "& .swiper-button-next , .swiper-button-prev": {
          top: "95%",
        },
        "& .swiper-button-prev:after, .swiper-button-next:after": {
          fontSize: { xs: "20px", md: "30px" },
          color: "white",
          borderRadius: "20px",
          padding: "4px",
        },
      }}
    >
      {error ? (
        <Box sx={{ color: "red" }}>{error}</Box>
      ) : (
        <>
          {Carousel.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: "10px",
              }}
            >
              <Skeleton
                animation="wave"
                variant="rounded"
                sx={{
                  background: "rgb(150 126 194 / 11%)",
                  width: "100%",
                  height: { xs: "300px", lg: "fill-available" },
                }}
              />

              <Skeleton
                variant="rounded"
                animation="wave"
                width="80%"
                sx={{ background: "rgb(150 126 194 / 11%)" }}
              />

              <Skeleton
                variant="rounded"
                animation="wave"
                width="60%"
                sx={{ background: "rgb(150 126 194 / 11%)" }}
              />
            </Box>
          ) : (
            <Box className="Carousel">
              <Swiper
                speed={2000}
                spaceBetween={30}
                effect={"fade"}
                navigation={true}
                onSlideChange={handleSlideChange}
                onSwiper={handleSwiperInit}
                pagination={{
                  clickable: true,
                }}
                // autoplay={{
                //   delay: 3000, // زمان تأخیر بین تغییر اسلایدها به میلی‌ثانیه
                //   disableOnInteraction: false, // اجازه می‌دهد که autoplay بعد از تعامل کاربر ادامه یابد
                // }}
                modules={[EffectFade, Navigation]}
                className="mySwiper"
              >
                {Carousel.map((item, index) => (
                  <SwiperSlide
                    onClick={() => Go_To_Details(item.id)}
                    className="SwiperSlide"
                    key={item.id}
                  >
                    <Box
                      className="backdrop_path"
                      component="img"
                      src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
                      alt={item.title}
                    />

                    <Box className="description">
                      <Box
                        className="poster_path"
                        component="img"
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      />

                      <Box
                        sx={{
                          bottom: 0,
                          display: "flex",
                          gap: { xs: "0px", md: "10px" },
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "20px", md: "34px" },
                            color: "white",
                            fontFamily: "Playfair Display, serif",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: { xs: "15px", md: "20px" },
                            fontFamily: "Playfair Display, serif",
                            color: "white",
                            display: "-webkit-box", // ایجاد یک جعبه انعطاف‌پذیر
                            WebkitLineClamp: 3, // تعداد خطوط محدود
                            WebkitBoxOrient: "vertical", // جهت جعبه به صورت عمودی
                            overflow: "hidden", // مخفی کردن محتوای اضافی
                          }}
                        >
                          {item.overview}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <ThumbUp
                            sx={{
                              color: "#ec2626",
                              fontSize: { xs: "20px", md: "25px" },
                            }}
                          />
                          <Typography
                            sx={{
                              color: "#cad9d3",
                              fontSize: { xs: "20px", md: "25px" },
                            }}
                          >
                            {item.vote_count}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* <Box className="Dark-layout" /> */}
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          )}
        </>
      )}
      <Box flexGrow="1">
        <HomeCarouselList List={list} />
      </Box>
    </Box>
  );
};
