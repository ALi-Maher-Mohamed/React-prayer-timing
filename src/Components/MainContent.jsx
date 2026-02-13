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
import { Prayer } from "./prayer";
import QiblaCompass from "./QiblaCompass";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar";

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

  // const images = [
  //   "src/assets/bg.jpg",
  //   "src/assets/bg.jpg",
  //   "src/assets/bg.jpg",
  //  ];

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

  return (
    <>
      {/* Header مع Theme Toggle */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "20px" : "0",
        }}
      >
        <Box
          component="h1"
          sx={{
            margin: 0,
            fontSize: isMobile ? "1.8rem" : "2.5rem",
            fontWeight: 800,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #f0c27f 0%, #fc5c7d 100%)"
                : "linear-gradient(135deg, #4b1248 0%, #7d2f7f 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.5px",
            filter:
              theme.palette.mode === "dark"
                ? "drop-shadow(0 0 15px rgba(240, 194, 127, 0.4)) drop-shadow(0 0 30px rgba(252, 92, 125, 0.2))"
                : "drop-shadow(0 0 12px rgba(75, 18, 72, 0.2)) drop-shadow(0 0 24px rgba(125, 47, 127, 0.1))",
            textShadow:
              theme.palette.mode === "dark"
                ? "0 0 20px rgba(240, 194, 127, 0.3), 0 0 40px rgba(252, 92, 125, 0.2)"
                : "0 0 15px rgba(75, 18, 72, 0.15), 0 0 30px rgba(125, 47, 127, 0.08)",
            transition: "all 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              filter:
                theme.palette.mode === "dark"
                  ? "drop-shadow(0 0 25px rgba(240, 194, 127, 0.6)) drop-shadow(0 0 50px rgba(252, 92, 125, 0.3))"
                  : "drop-shadow(0 0 20px rgba(75, 18, 72, 0.3)) drop-shadow(0 0 40px rgba(125, 47, 127, 0.15))",
            },
          }}
        >
          🕌 مواقيت الصلاة
        </Box>
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          sx={{
            padding: "10px",
            backgroundColor: "rgba(75, 18, 72, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(75, 18, 72, 0.2)",
            },
          }}
        >
          {isDarkMode ? (
            <Brightness7Icon sx={{ fontSize: "1.5rem" }} />
          ) : (
            <Brightness4Icon sx={{ fontSize: "1.5rem" }} />
          )}
        </IconButton>
      </Box>

      {/* Info Cards */}
      <Grid
        container
        spacing={isMobile ? 2 : 3}
        sx={{
          marginBottom: "40px",
        }}
      >
        {/* التاريخ والمدينة */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              padding: isMobile ? "20px" : "24px",
              borderRadius: "12px",
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
            }}
          >
            <p
              style={{
                margin: "0 0 10px 0",
                fontSize: isMobile ? "0.9rem" : "1rem",
                opacity: 0.7,
              }}
            >
              📅 التاريخ
            </p>
            <h2 style={{ margin: 0, fontSize: isMobile ? "1.3rem" : "1.6rem" }}>
              {today}
            </h2>
            <p
              style={{
                margin: "10px 0 0 0",
                fontSize: isMobile ? "0.9rem" : "1rem",
                opacity: 0.7,
              }}
            >
              📍 المدينة
            </p>
            <h2
              style={{
                margin: "5px 0 0 0",
                fontSize: isMobile ? "1.3rem" : "1.6rem",
              }}
            >
              {selectedCity.displayName}
            </h2>
          </Box>
        </Grid>

        {/* الصلاة القادمة والوقت المتبقي */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              padding: isMobile ? "20px" : "24px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #f0c27f 0%, #fc5c7d 100%)",
              boxShadow: "0 4px 25px rgba(240, 194, 127, 0.3)",
            }}
          >
            <p
              style={{
                margin: "0 0 10px 0",
                fontSize: isMobile ? "0.9rem" : "1rem",
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              ⏰ الصلاة القادمة
            </p>
            <h2
              style={{
                margin: "0 0 15px 0",
                fontSize: isMobile ? "1.3rem" : "1.6rem",
                color: "white",
              }}
            >
              {prayersArray[nextPrayerIndex]?.displayName}
            </h2>
            <p
              style={{
                margin: "0 0 10px 0",
                fontSize: isMobile ? "0.9rem" : "1rem",
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              الوقت المتبقي
            </p>
            <h2
              style={{
                margin: 0,
                fontSize: isMobile ? "2rem" : "2.5rem",
                color: "white",
                fontWeight: 800,
                fontFamily: "monospace",
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
      {/* City Selector */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        <FormControl sx={{ width: isMobile ? "80%" : "300px" }}>
          <InputLabel id="city-select-label" sx={{ textAlign: "center" }}>
            اختر المدينة
          </InputLabel>

          <Select
            value={selectedCity.value}
            onChange={handleCityChange}
            labelId="city-select-label"
            label="المدينة"
            sx={{
              textAlign: "center",
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
                borderColor:
                  theme.palette.mode === "dark" ? "#f0c27f" : "#4b1248",
                borderWidth: "2px",
              },
            }}
          >
            {cities.map((city) => (
              <MenuItem key={city.value} value={city.value}>
                {city.displayName}
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
      {/* Prayer Times Cards */}
      <Box sx={{ marginBottom: "40px" }}>
        <h3
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontSize: isMobile ? "1.3rem" : "1.5rem",
            opacity: 0.8,
          }}
        >
          📍 أوقات الصلوات
        </h3>

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

      {/* Qibla Direction */}
      <QiblaCompass />
    </>
  );
}
