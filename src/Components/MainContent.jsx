import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { Prayer } from "./prayer";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar";

moment.locale("ar-dz");

export default function MainContent() {
  const [selectedCity, setSelectedCity] = useState({
    displayName: "القاهرة",
    value: "cairo",
  });

  const [timings, setTimings] = useState({});
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  const [today, setToday] = useState("");
  const [remainingTime, setRemainingTime] = useState("");

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

  const images = [
    "https://i.pinimg.com/236x/af/9a/e3/af9ae302d2740ddeb3169cd747e8ef41.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnvap8rem6Yx_sTtw_l51J1KSaLmgbxpHE4dENj0MXlw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCfIyMy6iirqEWYo-rIn3zQS5fIDSryqwNAVWOtBw9Hw&s",
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
      setToday(t.format("MMM Do YYYY | h:mm:ss a"));
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
        prayerIndex = 0; // بعد العشاء → الفجر
      }
    }

    setNextPrayerIndex(prayerIndex);

    let nextPrayerTime = moment(
      timings[prayersArray[prayerIndex].key],
      "HH:mm",
    );

    // لو الوقت عدى صلاة العشاء نخلي الفجر اليوم التالي
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
      <Grid
        container
        style={{
          marginBottom: "50px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Grid item xs={6}>
          <div>
            <h3>{today}</h3>
            <h2>{selectedCity.displayName}</h2>
          </div>
        </Grid>

        <Grid item xs={6}>
          <div>
            <h3>متبقي حتي صلاة {prayersArray[nextPrayerIndex]?.displayName}</h3>
            <h2>{remainingTime}</h2>
          </div>
        </Grid>
      </Grid>

      <Divider style={{ borderColor: "white", opacity: "0.1" }} />

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        style={{ marginTop: "50px" }}
      >
        <Prayer image={images[0]} name={names[0]} time={times[0]} />
        <Prayer image={images[1]} name={names[1]} time={times[1]} />
        <Prayer image={images[2]} name={names[2]} time={times[2]} />
        <Prayer image={images[0]} name={names[3]} time={times[3]} />
        <Prayer image={images[1]} name={names[4]} time={times[4]} />
      </Stack>

      <Stack
        direction={"row"}
        justifyContent={"center"}
        style={{ marginTop: "50px" }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="city-select-label">
            <span style={{ color: "white" }}>{selectedCity.displayName}</span>
          </InputLabel>

          <Select
            value={selectedCity.value}
            onChange={handleCityChange}
            style={{ color: "white" }}
            labelId="city-select-label"
            label="المدينة"
          >
            {cities.map((city) => (
              <MenuItem key={city.value} value={city.value}>
                {city.displayName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
