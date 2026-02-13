import "./App.css";
import { useState, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import MainContent from "./Components/MainContent";
import { lightTheme, darkTheme } from "./theme";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = useMemo(() => {
    return isDarkMode ? darkTheme : lightTheme;
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          minHeight: "100vh",
          background:
            isDarkMode === true
              ? "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)"
              : "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)",
          transition: "background 0.5s ease",
          paddingTop: "20px",
          paddingBottom: "40px",
        }}
      >
        <Container maxWidth="lg">
          <MainContent toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
