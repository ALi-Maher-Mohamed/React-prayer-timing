import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Header({ toggleTheme, isDarkMode, isMobile }) {
  const primary = isDarkMode ? "#f0c27f" : "#4b1248";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 5,
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 3 : 0,
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", gap: isMobile ? 1.5 : 2 }}
      >
        <Box
          component="span"
          sx={{
            fontSize: isMobile ? "2.4rem" : "3rem",
            animation: "float 3s ease-in-out infinite",
            "&:hover": { transform: "scale(1.15) rotate(10deg)" },
          }}
        >
          🕌
        </Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: isMobile ? "1.8rem" : "2.6rem",
            fontWeight: 800,
            background: `linear-gradient(135deg, ${isDarkMode ? "#f0c27f" : "#4b1248"}, ${
              isDarkMode ? "#fc5c7d" : "#7d2f7f"
            })`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          مواقيت الصلاة
        </Typography>
      </Box>

      <IconButton
        onClick={toggleTheme}
        sx={{
          backgroundColor: `${primary}15`,
          border: `2px solid ${primary}30`,
          "&:hover": {
            backgroundColor: `${primary}25`,
            transform: "scale(1.1) rotate(20deg)",
          },
        }}
      >
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}
