import { Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import YouTube from "react-youtube";
import { useParams } from "react-router-dom";


export const Trailers = () => {
  const [trailerKeys, setTrailerKeys] = React.useState([]); // ذخیره کلیدها
  const { id } = useParams();
  const Fetch_video = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US)`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTJiYzNjNGNmMzVjY2UyMmRhODg3ZDdmNzZkNzQwZiIsIm5iZiI6MTczMjc3MjMxMi40NDMsInN1YiI6IjY3NDgwMWQ4MmY0M2IxNTBiOWIwODNhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S37GkiKR4Ja3MhEFNl7tIJ6JDZFOSo4TO_gsnxMQYkw`, // درست
            Accept: "application/json",
          },
        }
      );

      const keys = response.data.results
        .filter((video: { type: string }) => video.type === "Trailer") // فقط تریلرها
        .map((video: { key: string }) => video.key); // استخراج کلیدها

      setTrailerKeys(keys);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  React.useEffect(() => {
    Fetch_video();
  }, [id]);

  return trailerKeys.length > 0 ? (
    <Box
      sx={{
        m: "60px 33px",

        "& .title": {
          textAlign: "center",
          color: "yellow",
          fontWeight: "bolder",
          paddingBottom: "20px",
        },
        "& .Trailer": {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
          gap: "10px",
        },
        "& .YouTube": {
          borderRadius: "15px",
          overflow: "hidden",
        },
      }}
    >
      <Typography className="title" variant="h4">
        Watch Trailer
      </Typography>

      <Box className="Trailer">
        {trailerKeys.map((key, index) => (
          <Box>
            <YouTube
              className="YouTube"
              key={key}
              videoId={key}
              opts={{
                width: "100%",
                height: "400px",
               
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  ) : (
    <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
      No trailers available.
    </Typography>
  );
};
