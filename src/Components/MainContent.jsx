/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { Box, Divider, useTheme, useMediaQuery } from "@mui/material";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar";

import Header from "./Header";
import PrayerInfoCards from "./PrayerInfoCards";
import CitySelector from "./CitySelector";
import PrayerTimesSection from "./PrayerTimesSection";
import QiblaCompass from "./QiblaCompass";

import { CITIES, PRAYER_NAMES, PRAYERS_ARRAY } from "../constants";

moment.locale("ar-dz");

export default function MainContent({ toggleTheme, isDarkMode }) {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [timings, setTimings] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchTimings = async () => {
    try {
      const res = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?country=EG&city=${selectedCity.value}`,
      );
      setTimings(res.data.data.timings);
    } catch (err) {
      console.error("Error fetching prayer times", err);
    }
  };

  useEffect(() => {
    fetchTimings();
  }, [selectedCity.value]);

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 4, maxWidth: 1400, mx: "auto" }}>
      <Header
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        isMobile={isMobile}
      />

      <Divider sx={{ my: 5, borderColor: "rgba(75, 18, 72, 0.12)" }} />

      <PrayerInfoCards
        timings={timings}
        selectedCity={selectedCity}
        isMobile={isMobile}
        theme={theme}
      />

      <Divider sx={{ my: 5, borderColor: "rgba(75, 18, 72, 0.12)" }} />

      <CitySelector
        selectedCity={selectedCity}
        onChange={setSelectedCity}
        cities={CITIES}
        isMobile={isMobile}
        theme={theme}
      />

      <Divider sx={{ my: 5, borderColor: "rgba(75, 18, 72, 0.12)" }} />

      <PrayerTimesSection
        timings={timings}
        prayerNames={PRAYER_NAMES}
        times={[
          timings.Fajr,
          timings.Dhuhr,
          timings.Asr,
          timings.Maghrib,
          timings.Isha,
        ]}
        isMobile={isMobile}
        isTablet={useMediaQuery(theme.breakpoints.down("md"))}
      />

      <QiblaCompass />
    </Box>
  );
}
