import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Prayer from "./Prayer";

export default function PrayerTimesSection({
  times,
  prayerNames,
  isMobile,
  isTablet,
}) {
  return (
    <Box sx={{ mb: 5 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          mb: 4,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ fontSize: isMobile ? "2rem" : "2.4rem" }}>🕐</Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #f0c27f, #fc5c7d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          أوقات الصلوات
        </Typography>
      </Box>

      <Stack
        direction={isMobile ? "column" : isTablet ? "row" : "row"}
        spacing={isMobile ? 2 : 1.5}
        justifyContent="center"
        flexWrap="wrap"
        sx={{ "& > *": { flex: isMobile ? "1 1 100%" : "1 1 auto" } }}
      >
        {prayerNames.map((name, i) => (
          <Prayer key={name} name={name} time={times[i]} />
        ))}
      </Stack>
    </Box>
  );
}
