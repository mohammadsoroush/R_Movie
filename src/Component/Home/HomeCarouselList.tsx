import { ThumbUp } from "@mui/icons-material";
import { Box, Typography, Skeleton } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface HomeCarouselListProps {
  List: Array<{
    img: string;
    title: string;
    describe: string;
    vote: number;
    id: number;
  }>;
}

export const HomeCarouselList: React.FC<HomeCarouselListProps> = ({ List }) => {
  const Navigate = useNavigate();

  const Go_To_Details = (id: number) => {
    Navigate(`/moviesDetail/${id}`);
  };
  return (
    <Box
      sx={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        overflowX: "hidden",
        overflowY: "hidden",
        height: "100%",

        "& .ListItem": {
          display: "grid",
          gridTemplateColumns: {
            xs: "(1,minmax(100px, 1fr))",
            lg: "repeat(auto-fit, minmax(100px, 1fr))",
          },
          gap: "10px",
          cursor: "pointer",
          borderRadius: "20px",
          width: "100%",
        },
      }}
    >
      <Typography variant="h5" color="#dddd15">
        Up Coming
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", lg: "column" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: "80px", sm: "40px", lg: "10px" },
          width: "100%",
        }}
      >
        {List.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <Box sx={{display:"flex",gap:"20px"}}>
                <Skeleton
                  key={index} // استفاده از index به عنوان key
                  variant="rectangular"
                  animation="wave"
                  width={"70%"}
                  height={"150px"}
                  sx={{ background: "rgb(150 126 194 / 11%)", }}
                />
                <Box sx={{display:"flex",flexDirection:"column",width:'100%',justifyContent:"space-between"}}>
                <Skeleton
                  key={index} // استفاده از index به عنوان key
                  variant="circular"
                  animation="wave"
                  width={"20%"}
                  height={"80px"}
                  sx={{ background: "rgb(150 126 194 / 11%)" }}
                />
                <Skeleton
                  key={index} // استفاده از index به عنوان key
                  variant="rectangular"
                  animation="wave"
                  width={"100%"}
                  height={"20px"}
                  sx={{ background: "rgb(150 126 194 / 11%)" }}
                />

                </Box>
               

              </Box>
            ))}
          </Box>
        ) : (
          List.map((item, index) => (
            <motion.div
              onClick={() => Go_To_Details(item.id)}
              className="ListItem"
              key={`${item.title}${index}`}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.5 },
                background: "rgba(0,0,0,0.45)",
              }}
              initial="start"
              whileInView="visible"
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              variants={{
                start: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Box sx={{ overflow: "hidden" }}>
                <Box
                  sx={{ width: "100%", height: "100%", borderRadius: "12px" }}
                  component="img"
                  src={`https://image.tmdb.org/t/p/w500${item.img}`}
                  alt={item.title}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    width: "100%",
                    fontSize: { xs: "16px", md: "18px" },
                    fontFamily: "Playfair Display, serif",
                    color: "white",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    width: "100%",
                    fontFamily: "Playfair Display, serif",
                    color: "white",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    fontSize: { xs: "14px", md: "16px" },
                  }}
                >
                  {item.describe}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <ThumbUp sx={{ color: "#ec2626" }} />
                  <Typography sx={{ color: "#cad9d3" }}>{item.vote}</Typography>
                </Box>
              </Box>
            </motion.div>
          ))
        )}
      </Box>
    </Box>
  );
};
