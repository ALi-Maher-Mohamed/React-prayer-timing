import React from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { Prayer } from "./prayer";

export default function MainContent() {
  const handleChange = (event) => {
    console.log(event.target.value);
  };
  const images = [
    "https://i.pinimg.com/236x/af/9a/e3/af9ae302d2740ddeb3169cd747e8ef41.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnvap8rem6Yx_sTtw_l51J1KSaLmgbxpHE4dENj0MXlw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCfIyMy6iirqEWYo-rIn3zQS5fIDSryqwNAVWOtBw9Hw&s",
  ];
  const names = ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"];
  const times = ["05:00 AM", "12:00 PM", "03:00 PM", "06:00 PM", "08:00 PM"];
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
            <h3> 12:00 1/1/2023</h3>
            <h2>القاهرة</h2>
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
            <span style={{ color: "white" }}>المدينة </span>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //   value={20}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
