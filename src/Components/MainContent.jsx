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
  const handleCityChange = (event) => {
    const cityObject = cities.find((city) => city.value === event.target.value);
    console.log("the new city is :", event.target.value);
    setSelectedCity(cityObject);
  };

  const [selectedCity, setSelectedCity] = useState({
    displayName: "القاهرة",
    value: "cairo",
  });
  const [timings, setTimings] = useState({});
  const getTiming = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=EG&city=${selectedCity.value}`,
    );

    setTimings(response.data.data.timings);
  };

  const [today, setToday] = useState("");
  useEffect(() => {
    const t = moment();
    setToday(t.format("MMM Do YYYY | h:mm:ss a"));
    getTiming();
  }, [selectedCity]);

  const images = [
    "https://i.pinimg.com/236x/af/9a/e3/af9ae302d2740ddeb3169cd747e8ef41.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnvap8rem6Yx_sTtw_l51J1KSaLmgbxpHE4dENj0MXlw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCfIyMy6iirqEWYo-rIn3zQS5fIDSryqwNAVWOtBw9Hw&s",
  ];

  const names = ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"];
  const times = [
    timings.Fajr,
    timings.Dhuhr,
    timings.Asr,
    timings.Maghrib,
    timings.Isha,
  ];

  const cities = [
    { displayName: "القاهرة", value: "cairo" },
    { displayName: "الاسكندرية", value: "alexandria" },
    { displayName: "سوهاج", value: "sohag" },
    { displayName: "الاقصر", value: "luxor" },
    { displayName: "اسيوط", value: "asyut" },
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
        <Grid xs={6}>
          <div>
            <h3>{today}</h3>
            <h2>{selectedCity.displayName}</h2>
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h3> متبقي حتي صلاة العصر </h3>
            <h2>00:50:10</h2>
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
          <InputLabel id="demo-simple-select-label">
            <span style={{ color: "white" }}> {selectedCity.displayName} </span>
          </InputLabel>
          <Select
            // value={cities.value}
            onChange={(e) => handleCityChange(e)}
            style={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
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
