import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import { Prayer } from "./prayer";
import QiblaCompass from "./QiblaCompass";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar";
import { Typography } from "@mui/material";

moment.locale("ar-dz");

export default function MainContent({ toggleTheme, isDarkMode }) {
  const [selectedCity, setSelectedCity] = useState({
    displayName: "القاهرة",
    value: "cairo",
  });

  const [timings, setTimings] = useState({});
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  const [today, setToday] = useState("");
  const [remainingTime, setRemainingTime] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const cities = [
    { displayName: "القاهرة", value: "Cairo" },
    { displayName: "الاسكندرية", value: "Alexandria" },
    { displayName: "سوهاج", value: "Sohag" },
    { displayName: "الاقصر", value: "Luxor" },
    { displayName: "اسيوط", value: "Asyut" },
  ];

  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  const names = ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"];

  const handleCityChange = (event) => {
    const cityObject = cities.find((city) => city.value === event.target.value);
    setSelectedCity(cityObject);
  };

  const getTiming = async () => {
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?country=EG&city=${selectedCity.value}`,
      );

      setTimings(response.data.data.timings);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  useEffect(() => {
    getTiming();
  }, [selectedCity]);

  useEffect(() => {
    if (!timings.Fajr) return;

    const interval = setInterval(() => {
      setupCountDownTimer();
      const t = moment();
      setToday(t.format("dddd, MMMM Do YYYY"));
    }, 1000);

    return () => clearInterval(interval);
  }, [timings]);

  const setupCountDownTimer = () => {
    const now = moment();

    let prayerIndex = 0;

    for (let i = 0; i < prayersArray.length; i++) {
      const prayerTime = moment(timings[prayersArray[i].key], "HH:mm");

      if (now.isBefore(prayerTime)) {
        prayerIndex = i;
        break;
      }

      if (i === prayersArray.length - 1) {
        prayerIndex = 0;
      }
    }

    setNextPrayerIndex(prayerIndex);

    let nextPrayerTime = moment(
      timings[prayersArray[prayerIndex].key],
      "HH:mm",
    );

    if (now.isAfter(nextPrayerTime)) {
      nextPrayerTime.add(1, "day");
    }

    const diff = nextPrayerTime.diff(now);

    const duration = moment.duration(diff);

    const hours = String(duration.hours()).padStart(2, "0");
    const minutes = String(duration.minutes()).padStart(2, "0");
    const seconds = String(duration.seconds()).padStart(2, "0");

    setRemainingTime(`${hours}:${minutes}:${seconds}`);
  };

  const times = [
    timings.Fajr,
    timings.Dhuhr,
    timings.Asr,
    timings.Maghrib,
    timings.Isha,
  ];

  // ==========================================
  // 🎨 Styles مشترك للـ Animation و Effects
  // ==========================================

  const iconAnimation = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotateZ(0deg); }
      50% { transform: translateY(-10px) rotateZ(5deg); }
    }
  `;

  const getPrimaryColor = () => {
    return theme.palette.mode === "dark" ? "#f0c27f" : "#4b1248";
  };

  const getSecondaryColor = () => {
    return theme.palette.mode === "dark" ? "#fc5c7d" : "#7d2f7f";
  };

  return (
    <>
      <style>{iconAnimation}</style>

      {/* ========================================
          🏠 HEADER - Icon منفصل مع Animation
          ======================================== */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "20px" : "0",
        }}
      >
        {/* Logo مع Animation */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "12px" : "16px",
            margin: 0,
          }}
        >
          <Box
            sx={{
              fontSize: isMobile ? "2rem" : "2.8rem",
              animation: "float 3s ease-in-out infinite",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.15) rotateZ(10deg)",
                filter: `drop-shadow(0 0 15px ${getPrimaryColor()})`,
              },
            }}
          >
            🕌
          </Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: isMobile ? "1.6rem" : "2.4rem",
              fontWeight: 800,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #f0c27f 0%, #fc5c7d 100%)"
                  : "linear-gradient(135deg, #4b1248 0%, #7d2f7f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
              letterSpacing: "-0.5px",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            مواقيت الصلاة
          </Typography>
        </Box>

        {/* Theme Toggle Button مع تأثيرات */}
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          sx={{
            padding: "12px",
            backgroundColor: `${getPrimaryColor()}15`,
            border: `2px solid ${getPrimaryColor()}30`,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              backgroundColor: `${getPrimaryColor()}25`,
              borderColor: `${getPrimaryColor()}50`,
              transform: "scale(1.1) rotate(20deg)",
            },
            "&:active": {
              transform: "scale(0.95)",
            },
          }}
        >
          {isDarkMode ? (
            <Brightness7Icon
              sx={{
                fontSize: "1.5rem",
                transition: "transform 0.3s ease",
              }}
            />
          ) : (
            <Brightness4Icon
              sx={{
                fontSize: "1.5rem",
                transition: "transform 0.3s ease",
              }}
            />
          )}
        </IconButton>
      </Box>

      {/* ========================================
          📅 INFO CARDS - Icon منفصل مع Hover
          ======================================== */}
      <Grid
        container
        spacing={isMobile ? 2 : 3}
        sx={{
          marginBottom: "40px",
        }}
      >
        {/* التاريخ والمدينة - مع Icons منفصلة */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              padding: isMobile ? "24px" : "28px",
              borderRadius: "16px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #1a1f3a 0%, #232d4a 100%)"
                  : "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(240, 194, 127, 0.1)"
                  : "1px solid rgba(75, 18, 72, 0.1)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 4px 15px rgba(240, 194, 127, 0.08)"
                  : "0 4px 15px rgba(75, 18, 72, 0.08)",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 12px 30px rgba(240, 194, 127, 0.15)"
                    : "0 12px 30px rgba(75, 18, 72, 0.15)",
                borderColor:
                  theme.palette.mode === "dark"
                    ? "rgba(240, 194, 127, 0.3)"
                    : "rgba(75, 18, 72, 0.2)",
              },
            }}
          >
            {/* التاريخ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <EventIcon
                sx={{
                  fontSize: isMobile ? "1.8rem" : "2rem",
                  color: getPrimaryColor(),
                  transition: "all 0.3s ease",
                  animation: "float 3s ease-in-out infinite",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
              />
              <Box>
                <p
                  style={{
                    margin: "0 0 6px 0",
                    fontSize: isMobile ? "0.85rem" : "0.95rem",
                    opacity: 0.6,
                    fontWeight: 500,
                  }}
                >
                  التاريخ
                </p>
                <h2
                  style={{
                    margin: 0,
                    fontSize: isMobile ? "1.2rem" : "1.5rem",
                    fontWeight: 700,
                  }}
                >
                  {today}
                </h2>
              </Box>
            </Box>

            {/* الفاصل */}
            <Divider sx={{ opacity: 0.2, marginBottom: "20px" }} />

            {/* المدينة */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <LocationOnIcon
                sx={{
                  fontSize: isMobile ? "1.8rem" : "2rem",
                  color: getSecondaryColor(),
                  transition: "all 0.3s ease",
                  animation: "float 2s ease-in-out infinite",
                  animationDelay: "0.2s",
                  "&:hover": {
                    transform: "scale(1.2) rotateZ(-10deg)",
                  },
                }}
              />
              <Box>
                <p
                  style={{
                    margin: "0 0 6px 0",
                    fontSize: isMobile ? "0.85rem" : "0.95rem",
                    opacity: 0.6,
                    fontWeight: 500,
                  }}
                >
                  المدينة
                </p>
                <h2
                  style={{
                    margin: 0,
                    fontSize: isMobile ? "1.2rem" : "1.5rem",
                    fontWeight: 700,
                  }}
                >
                  {selectedCity.displayName}
                </h2>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* الصلاة القادمة والوقت المتبقي - مع Icon */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              padding: isMobile ? "24px" : "28px",
              borderRadius: "16px",
              background: `linear-gradient(135deg, ${getPrimaryColor()} 0%, ${getSecondaryColor()} 100%)`,
              boxShadow: `0 4px 25px ${getPrimaryColor()}40`,
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at top right, ${getSecondaryColor()}20, transparent)`,
                pointerEvents: "none",
              },
              "&:hover": {
                transform: "translateY(-8px) scale(1.02)",
                boxShadow: `0 15px 40px ${getPrimaryColor()}60`,
              },
            }}
          >
            {/* Icon الصلاة القادمة */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <AccessTimeIcon
                sx={{
                  fontSize: isMobile ? "1.8rem" : "2rem",
                  color: "white",
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
                  animation: "pulse 2s ease-in-out infinite",
                  "@keyframes pulse": {
                    "0%, 100%": { transform: "scale(1) rotateZ(0deg)" },
                    "50%": { transform: "scale(1.15) rotateZ(10deg)" },
                  },
                }}
              />
              <Box>
                <p
                  style={{
                    margin: 0,
                    fontSize: isMobile ? "0.9rem" : "1rem",
                    color: "rgba(255, 255, 255, 0.85)",
                    fontWeight: 500,
                  }}
                >
                  الصلاة القادمة
                </p>
              </Box>
            </Box>

            <h2
              style={{
                margin: "0 0 20px 0",
                fontSize: isMobile ? "1.4rem" : "1.8rem",
                color: "white",
                fontWeight: 800,
              }}
            >
              {prayersArray[nextPrayerIndex]?.displayName}
            </h2>

            {/* الفاصل */}
            <Box
              sx={{
                height: "2px",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "1px",
                marginBottom: "20px",
              }}
            />

            {/* الوقت المتبقي */}
            <p
              style={{
                margin: "0 0 12px 0",
                fontSize: isMobile ? "0.9rem" : "1rem",
                color: "rgba(255, 255, 255, 0.85)",
                fontWeight: 500,
              }}
            >
              الوقت المتبقي
            </p>
            <h2
              style={{
                margin: 0,
                fontSize: isMobile ? "2.2rem" : "2.8rem",
                color: "white",
                fontWeight: 800,
                fontFamily: "monospace",
                letterSpacing: "2px",
              }}
            >
              {remainingTime}
            </h2>
          </Box>
        </Grid>
      </Grid>

      <Divider
        sx={{
          borderColor: "rgba(75, 18, 72, 0.15)",
          marginBottom: "40px",
        }}
      />

      {/* ========================================
          🏙️ CITY SELECTOR - محسّن مع Icon
          ======================================== */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "40px",
          gap: isMobile ? "12px" : "16px",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <LocationOnIcon
          sx={{
            fontSize: isMobile ? "1.5rem" : "1.8rem",
            color: getPrimaryColor(),
            display: isMobile ? "block" : "none",
            animation: "float 3s ease-in-out infinite",
          }}
        />
        <FormControl sx={{ width: isMobile ? "80%" : "320px" }}>
          <InputLabel
            id="city-select-label"
            sx={{
              textAlign: "center",
              fontWeight: 600,
              "&.Mui-focused": {
                color: getPrimaryColor(),
              },
            }}
          >
            اختر المدينة
          </InputLabel>

          <Select
            value={selectedCity.value}
            onChange={handleCityChange}
            labelId="city-select-label"
            label="المدينة"
            sx={{
              textAlign: "center",
              borderRadius: "12px",
              fontWeight: 600,
              transition: "all 0.3s ease",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  theme.palette.mode === "dark"
                    ? "rgba(240, 194, 127, 0.2)"
                    : "rgba(75, 18, 72, 0.2)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  theme.palette.mode === "dark"
                    ? "rgba(240, 194, 127, 0.4)"
                    : "rgba(75, 18, 72, 0.4)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: getPrimaryColor(),
                borderWidth: "2px",
                boxShadow: `0 0 0 3px ${getPrimaryColor()}20`,
              },
            }}
          >
            {cities.map((city) => (
              <MenuItem
                key={city.value}
                value={city.value}
                sx={{
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: `${getPrimaryColor()}15`,
                  },
                  "&.Mui-selected": {
                    backgroundColor: `${getPrimaryColor()}25`,
                    "&:hover": {
                      backgroundColor: `${getPrimaryColor()}35`,
                    },
                  },
                }}
              >
                📍 {city.displayName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider
        sx={{
          borderColor: "rgba(75, 18, 72, 0.15)",
          marginBottom: "40px",
        }}
      />

      {/* ========================================
          🕐 PRAYER TIMES HEADER
          ======================================== */}
      <Box sx={{ marginBottom: "40px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              fontSize: isMobile ? "1.8rem" : "2.2rem",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            🕐
          </Box>
          <h3
            style={{
              textAlign: "center",
              margin: 0,
              fontSize: isMobile ? "1.3rem" : "1.5rem",
              fontWeight: 700,
              background: `linear-gradient(135deg, ${getPrimaryColor()}, ${getSecondaryColor()})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            أوقات الصلوات
          </h3>
        </Box>

        <Stack
          direction={isMobile ? "column" : isTablet ? "row" : "row"}
          spacing={isMobile ? 2 : 1.5}
          justifyContent="center"
          flexWrap="wrap"
          sx={{
            "& > *": {
              flex: isMobile ? "1 1 100%" : "1 1 auto",
            },
          }}
        >
          <Prayer name={names[0]} time={times[0]} />
          <Prayer name={names[1]} time={times[1]} />
          <Prayer name={names[2]} time={times[2]} />
          <Prayer name={names[3]} time={times[3]} />
          <Prayer name={names[4]} time={times[4]} />
        </Stack>
      </Box>

      <Divider
        sx={{
          borderColor: "rgba(75, 18, 72, 0.15)",
          marginBottom: "40px",
        }}
      />

      {/* ========================================
          🧭 QIBLA DIRECTION
          ======================================== */}
      <QiblaCompass />
    </>
  );
}
