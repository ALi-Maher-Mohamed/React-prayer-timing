import React, { useEffect, useState } from "react";
import { Grid, Box, Divider, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";
import { PRAYERS_ARRAY } from "../constants";

export default function PrayerInfoCards({
  timings,
  selectedCity,
  isMobile,
  theme,
}) {
  const [today, setToday] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);

  const isDark = theme.palette.mode === "dark";
  const primary = isDark ? "#f0c27f" : "#4b1248";
  const secondary = isDark ? "#fc5c7d" : "#7d2f7f";

  useEffect(() => {
    if (!timings?.Fajr) return;

    const interval = setInterval(() => {
      const now = moment();

      setToday(now.format("dddd, MMMM Do YYYY"));

      // حساب الصلاة القادمة والوقت المتبقي
      let prayerIndex = 0;
      for (let i = 0; i < PRAYERS_ARRAY.length; i++) {
        const prayerTime = moment(timings[PRAYERS_ARRAY[i].key], "HH:mm");
        if (now.isBefore(prayerTime)) {
          prayerIndex = i;
          break;
        }
        if (i === PRAYERS_ARRAY.length - 1) prayerIndex = 0;
      }

      setNextPrayerIndex(prayerIndex);

      let nextTime = moment(timings[PRAYERS_ARRAY[prayerIndex].key], "HH:mm");
      if (now.isAfter(nextTime)) nextTime.add(1, "day");

      const diff = nextTime.diff(now);
      const duration = moment.duration(diff);

      const h = String(duration.hours()).padStart(2, "0");
      const m = String(duration.minutes()).padStart(2, "0");
      const s = String(duration.seconds()).padStart(2, "0");

      setRemainingTime(`${h}:${m}:${s}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [timings]);

  return (
    <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 5 }}>
      {/* التاريخ والمدينة */}
      <Grid item xs={12} sm={6}>
        <Box
          sx={{
            p: isMobile ? 3 : 3.5,
            borderRadius: 4,
            background: isDark
              ? "linear-gradient(135deg, #1a1f3a 0%, #232d4a 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
            border: `1px solid ${isDark ? "rgba(240,194,127,0.1)" : "rgba(75,18,72,0.1)"}`,
            boxShadow: isDark
              ? "0 4px 15px rgba(240,194,127,0.08)"
              : "0 4px 15px rgba(75,18,72,0.08)",
            transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: isDark
                ? "0 12px 30px rgba(240,194,127,0.15)"
                : "0 12px 30px rgba(75,18,72,0.15)",
            },
          }}
        >
          {/* التاريخ */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}
          >
            <EventIcon
              sx={{
                fontSize: isMobile ? "1.8rem" : "2rem",
                color: primary,
                animation: "float 3s ease-in-out infinite",
              }}
            />
            <Box>
              <Typography
                variant="caption"
                sx={{ opacity: 0.6, fontWeight: 500 }}
              >
                التاريخ
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {today}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2.5, opacity: 0.2 }} />

          {/* المدينة */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <LocationOnIcon
              sx={{
                fontSize: isMobile ? "1.8rem" : "2rem",
                color: secondary,
                animation: "float 2s ease-in-out infinite",
                animationDelay: "0.2s",
              }}
            />
            <Box>
              <Typography
                variant="caption"
                sx={{ opacity: 0.6, fontWeight: 500 }}
              >
                المدينة
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {selectedCity.displayName}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>

      {/* الصلاة القادمة */}
      <Grid item xs={12} sm={6}>
        <Box
          sx={{
            p: isMobile ? 3 : 3.5,
            borderRadius: 4,
            background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
            boxShadow: `0 4px 25px ${primary}40`,
            position: "relative",
            overflow: "hidden",
            "&:hover": {
              transform: "translateY(-8px) scale(1.02)",
              boxShadow: `0 15px 40px ${primary}60`,
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <AccessTimeIcon
              sx={{ fontSize: isMobile ? "1.8rem" : "2rem", color: "white" }}
            />
            <Typography
              sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}
            >
              الصلاة القادمة
            </Typography>
          </Box>

          <Typography
            variant="h5"
            sx={{ color: "white", fontWeight: 800, mb: 2.5 }}
          >
            {PRAYERS_ARRAY[nextPrayerIndex]?.displayName || "—"}
          </Typography>

          <Box
            sx={{
              height: 2,
              bgcolor: "rgba(255,255,255,0.2)",
              borderRadius: 1,
              my: 2.5,
            }}
          />

          <Typography
            sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 500, mb: 1 }}
          >
            الوقت المتبقي
          </Typography>

          <Typography
            sx={{
              fontSize: isMobile ? "2.4rem" : "3rem",
              fontWeight: 800,
              color: "white",
              fontFamily: "monospace",
              letterSpacing: 2,
            }}
          >
            {remainingTime || "--:--:--"}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
