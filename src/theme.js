import { createTheme } from "@mui/material/styles";

// Light Theme
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4b1248",
      light: "#7d2f7f",
      dark: "#2a0741",
    },
    secondary: {
      main: "#f0c27f",
      light: "#f5d9a3",
      dark: "#d4a660",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: ["Cairo", "system-ui", "sans-serif"].join(","),
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#4b1248",
    },
    h3: {
      fontSize: "1.2rem",
      fontWeight: 600,
      color: "#666666",
    },
    h5: {
      fontSize: "1.1rem",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 8px 25px rgba(75, 18, 72, 0.15)",
            transform: "translateY(-4px)",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5",
          color: "#1a1a1a",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#eeeeee",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#1a1a1a",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(75, 18, 72, 0.2)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(75, 18, 72, 0.4)",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#666666",
        },
      },
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f0c27f",
      light: "#f5d9a3",
      dark: "#d4a660",
    },
    secondary: {
      main: "#fc5c7d",
      light: "#fd8ba0",
      dark: "#e63d5a",
    },
    background: {
      default: "#0a0e27",
      paper: "#1a1f3a",
    },
    text: {
      primary: "#f5f5f5",
      secondary: "#b0b0b0",
    },
  },
  typography: {
    fontFamily: ["Cairo", "system-ui", "sans-serif"].join(","),
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      background: "linear-gradient(135deg, #f0c27f, #fc5c7d)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    h3: {
      fontSize: "1.2rem",
      fontWeight: 600,
      color: "#d0d0d0",
    },
    h5: {
      fontSize: "1.1rem",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #1a1f3a 0%, #232d4a 100%)",
          boxShadow: "0 4px 15px rgba(240, 194, 127, 0.1)",
          border: "1px solid rgba(240, 194, 127, 0.1)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 8px 25px rgba(240, 194, 127, 0.2)",
            transform: "translateY(-4px)",
            borderColor: "rgba(240, 194, 127, 0.3)",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "#232d4a",
          color: "#f5f5f5",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#2a3654",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#f5f5f5",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(240, 194, 127, 0.2)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(240, 194, 127, 0.4)",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#b0b0b0",
        },
      },
    },
  },
});
