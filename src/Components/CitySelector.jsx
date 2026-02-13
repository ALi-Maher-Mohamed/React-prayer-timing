import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function CitySelector({
  selectedCity,
  onChange,
  cities,
  isMobile,
  theme,
}) {
  const primary = theme.palette.mode === "dark" ? "#f0c27f" : "#4b1248";

  const getPrimaryColor = () => primary;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 5,
          gap: isMobile ? 1.5 : 2,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <LocationOnIcon
          sx={{
            fontSize: isMobile ? "1.8rem" : "2rem",
            color: getPrimaryColor(),
            display: isMobile ? "block" : "none",
            animation: "float 3s ease-in-out infinite",
          }}
        />

        <FormControl sx={{ width: isMobile ? "80%" : 320 }}>
          <InputLabel
            id="city-select-label"
            sx={{
              fontWeight: 600,
              "&.Mui-focused": { color: getPrimaryColor() },
            }}
          >
            اختر المدينة
          </InputLabel>

          <Select
            value={selectedCity.value}
            onChange={(e) => {
              const city = cities.find((c) => c.value === e.target.value);
              if (city) onChange(city);
            }}
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
                  "&:hover": { backgroundColor: `${getPrimaryColor()}15` },
                  "&.Mui-selected": {
                    backgroundColor: `${getPrimaryColor()}25`,
                    "&:hover": { backgroundColor: `${getPrimaryColor()}35` },
                  },
                }}
              >
                📍 {city.displayName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
