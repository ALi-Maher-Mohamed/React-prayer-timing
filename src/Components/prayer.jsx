import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import myImage from "../assets/bg.jpg"; // ← تأكد من المسار

export default function Prayer({ name, time }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDark = theme.palette.mode === "dark";

  return (
    <Card
      sx={{
        width: isMobile ? "100%" : 160,
        minWidth: isMobile ? "100%" : 160,
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <CardActionArea>
        <Box sx={{ position: "relative", height: 160, overflow: "hidden" }}>
          <CardMedia
            component="img"
            height="160"
            image={myImage}
            alt={name}
            sx={{
              objectFit: "cover",
              transition: "transform 0.4s ease",
              "&:hover": { transform: "scale(1.08)" },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.35) 100%)",
              pointerEvents: "none",
            }}
          />
        </Box>

        <CardContent sx={{ textAlign: "center", py: isMobile ? 2 : 1.5 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: isDark ? "#f0c27f" : "#4b1248",
              mb: 1,
            }}
          >
            {name}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: isDark ? "rgba(255,255,255,0.95)" : "rgba(30,30,30,0.95)",
              letterSpacing: 0.5,
            }}
          >
            {time || "—"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
