import React, { useMemo } from "react";
import {
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import CompassCalibrationIcon from "@mui/icons-material/CompassCalibration";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useQiblaDirection } from "../hooks/useQiblaDirection";
import "./QiblaCompass.css";

// Pre-computed tick mark rotation values (every 30°)
const TICK_DEGREES = Array.from({ length: 12 }, (_, i) => i * 30);

/**
 * QiblaCompass — displays a compass circle with an arrow pointing
 * toward Makkah. Supports device orientation for real-time rotation.
 * 🧭 Enhanced with Icon Separation and Advanced Animations
 */
export default function QiblaCompass() {
  const { direction, loading, error, deviceHeading } = useQiblaDirection();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getPrimaryColor = () => {
    return theme.palette.mode === "dark" ? "#f0c27f" : "#4b1248";
  };

  const getSecondaryColor = () => {
    return theme.palette.mode === "dark" ? "#fc5c7d" : "#7d2f7f";
  };

  // Rotation for the entire compass ring (device heading compensation)
  const compassRotation = useMemo(() => {
    if (deviceHeading == null) return 0;
    return -deviceHeading;
  }, [deviceHeading]);

  // Rotation for the Qibla arrow
  const arrowRotation = useMemo(() => {
    if (direction == null) return 0;
    return direction;
  }, [direction]);

  // Formatted bearing text
  const bearingText = useMemo(() => {
    if (direction == null) return "—";
    return `${direction.toFixed(1)}°`;
  }, [direction]);

  // ── Loading State ──────────────────────────────────────
  if (loading) {
    return (
      <Box
        className="qibla-section"
        sx={{ marginTop: isMobile ? "30px" : "50px" }}
      >
        {/* Header مع Icon منفصل */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          <CompassCalibrationIcon
            sx={{
              fontSize: isMobile ? "2rem" : "2.4rem",
              color: getPrimaryColor(),
              animation: "float 3s ease-in-out infinite",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.2) rotateZ(45deg)",
                filter: `drop-shadow(0 0 15px ${getPrimaryColor()})`,
              },
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: isMobile ? "1.4rem" : "1.8rem",
              fontWeight: 800,
              background: `linear-gradient(135deg, ${getPrimaryColor()}, ${getSecondaryColor()})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            اتجاه القبلة
          </Typography>
        </Box>

        {/* Loading Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <CircularProgress
            size={56}
            sx={{
              color: getPrimaryColor(),
              animation: "pulse 1.5s ease-in-out infinite",
              "@keyframes pulse": {
                "0%, 100%": { opacity: 0.8 },
                "50%": { opacity: 1 },
              },
            }}
          />
          <Typography
            sx={{
              fontSize: isMobile ? "0.95rem" : "1.1rem",
              opacity: 0.7,
              fontWeight: 500,
            }}
          >
            جاري تحديد موقعك...
          </Typography>
        </Box>
      </Box>
    );
  }

  // ── Error State ────────────────────────────────────────
  if (error) {
    return (
      <Box
        className="qibla-section"
        sx={{ marginTop: isMobile ? "30px" : "50px" }}
      >
        {/* Header مع Icon منفصل */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          <CompassCalibrationIcon
            sx={{
              fontSize: isMobile ? "2rem" : "2.4rem",
              color: getPrimaryColor(),
              animation: "shake 0.5s ease-in-out",
              "@keyframes shake": {
                "0%, 100%": { transform: "translateX(0)" },
                "25%": { transform: "translateX(-10px)" },
                "75%": { transform: "translateX(10px)" },
              },
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: isMobile ? "1.4rem" : "1.8rem",
              fontWeight: 800,
              background: `linear-gradient(135deg, ${getPrimaryColor()}, ${getSecondaryColor()})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            اتجاه القبلة
          </Typography>
        </Box>

        {/* Error Box */}
        <Box
          sx={{
            padding: isMobile ? "20px" : "28px",
            borderRadius: "16px",
            maxWidth: "380px",
            margin: "0 auto",
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(240, 194, 127, 0.05)"
                : "rgba(75, 18, 72, 0.05)",
            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(240, 194, 127, 0.2)"
                : "1px solid rgba(75, 18, 72, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(240, 194, 127, 0.1)"
                  : "rgba(75, 18, 72, 0.1)",
              borderColor:
                theme.palette.mode === "dark"
                  ? "rgba(240, 194, 127, 0.4)"
                  : "rgba(75, 18, 72, 0.4)",
            },
          }}
        >
          <Box
            sx={{
              fontSize: "2.5rem",
              marginBottom: "12px",
              animation: "bounce 2s ease-in-out infinite",
              "@keyframes bounce": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-10px)" },
              },
            }}
          >
            📍
          </Box>
          <Typography
            sx={{
              fontSize: isMobile ? "0.9rem" : "1rem",
              opacity: 0.85,
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            {error}
          </Typography>
        </Box>
      </Box>
    );
  }

  // ── Compass ────────────────────────────────────────────
  return (
    <Box
      className="qibla-section"
      sx={{ marginTop: isMobile ? "30px" : "50px" }}
    >
      {/* Header مع Icon منفصل */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "12px",
          flexWrap: "wrap",
        }}
      >
        <CompassCalibrationIcon
          sx={{
            fontSize: isMobile ? "2rem" : "2.4rem",
            color: getPrimaryColor(),
            animation: "float 3s ease-in-out infinite",
            transition: "all 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.2) rotateZ(45deg)",
              filter: `drop-shadow(0 0 15px ${getPrimaryColor()})`,
            },
          }}
        />
        <Typography
          variant="h2"
          sx={{
            fontSize: isMobile ? "1.4rem" : "1.8rem",
            fontWeight: 800,
            background: `linear-gradient(135deg, ${getPrimaryColor()}, ${getSecondaryColor()})`,
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
          اتجاه القبلة
        </Typography>
      </Box>

      {/* Subtitle مع Icon */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          marginBottom: "28px",
          opacity: 0.7,
        }}
      >
        <StorefrontIcon
          sx={{
            fontSize: "1.2rem",
            animation: "float 2.5s ease-in-out infinite",
            animationDelay: "0.3s",
          }}
        />
        <Typography
          sx={{
            fontSize: isMobile ? "0.9rem" : "1rem",
            fontStyle: "italic",
          }}
        >
          الاتجاه نحو الكعبة المشرفة
        </Typography>
      </Box>

      {/* Compass Container */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "28px",
        }}
      >
        <div
          className="compass-wrapper"
          style={{
            width: isMobile ? "200px" : "260px",
            height: isMobile ? "200px" : "260px",
          }}
        >
          {/* Compass ring — rotates with device heading */}
          <div
            className="compass-ring"
            style={{
              transform: `rotate(${compassRotation}deg)`,
              borderColor:
                theme.palette.mode === "dark"
                  ? "rgba(240, 194, 127, 0.35)"
                  : "rgba(75, 18, 72, 0.35)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 0 40px rgba(240, 194, 127, 0.08), inset 0 0 60px rgba(0, 0, 0, 0.3)"
                  : "0 0 40px rgba(75, 18, 72, 0.08), inset 0 0 60px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Tick marks */}
            <div className="tick-marks">
              {TICK_DEGREES.map((deg) => (
                <div
                  key={deg}
                  className={`tick ${deg % 90 === 0 ? "major" : ""}`}
                  style={{
                    transform: `rotate(${deg}deg)`,
                    background:
                      deg % 90 === 0
                        ? theme.palette.mode === "dark"
                          ? "rgba(240, 194, 127, 0.4)"
                          : "rgba(75, 18, 72, 0.4)"
                        : theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(75, 18, 72, 0.15)",
                  }}
                />
              ))}
            </div>

            {/* Inner decorative ring */}
            <div
              className="compass-inner-ring"
              style={{
                borderColor:
                  theme.palette.mode === "dark"
                    ? "rgba(240, 194, 127, 0.15)"
                    : "rgba(75, 18, 72, 0.15)",
              }}
            />

            {/* Cardinal directions */}
            <span className="cardinal north">N</span>
            <span className="cardinal south">S</span>
            <span className="cardinal east">E</span>
            <span className="cardinal west">W</span>

            {/* Center dot */}
            <div
              className="compass-center-dot"
              style={{
                background:
                  theme.palette.mode === "dark"
                    ? "radial-gradient(circle, #f0c27f, #4b1248)"
                    : "radial-gradient(circle, #f0c27f, #7d2f7f)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 0 12px rgba(240, 194, 127, 0.6)"
                    : "0 0 12px rgba(75, 18, 72, 0.3)",
              }}
            />

            {/* Qibla arrow */}
            <div
              className="qibla-arrow"
              style={{ transform: `rotate(${arrowRotation}deg)` }}
            >
              <div className="kaaba-icon">🕋</div>
              <div
                className="arrow-head"
                style={{
                  borderBottomColor:
                    theme.palette.mode === "dark" ? "#f0c27f" : "#4b1248",
                  filter:
                    theme.palette.mode === "dark"
                      ? "drop-shadow(0 0 8px rgba(240, 194, 127, 0.7))"
                      : "drop-shadow(0 0 8px rgba(75, 18, 72, 0.5))",
                }}
              />
              <div
                className="arrow-line"
                style={{
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(to bottom, #f0c27f, transparent)"
                      : "linear-gradient(to bottom, #4b1248, transparent)",
                }}
              />
            </div>
          </div>
        </div>
      </Box>

      {/* Bearing readout مع Animation */}
      <Box
        className="bearing-info"
        sx={{
          padding: isMobile ? "20px" : "24px",
          borderRadius: "12px",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(240, 194, 127, 0.1) 0%, rgba(252, 92, 125, 0.1) 100%)"
              : "linear-gradient(135deg, rgba(75, 18, 72, 0.08) 0%, rgba(125, 47, 127, 0.08) 100%)",
          border:
            theme.palette.mode === "dark"
              ? "1px solid rgba(240, 194, 127, 0.2)"
              : "1px solid rgba(75, 18, 72, 0.2)",
          transition: "all 0.3s ease",
          "&:hover": {
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, rgba(240, 194, 127, 0.15) 0%, rgba(252, 92, 125, 0.15) 100%)"
                : "linear-gradient(135deg, rgba(75, 18, 72, 0.12) 0%, rgba(125, 47, 127, 0.12) 100%)",
            borderColor:
              theme.palette.mode === "dark"
                ? "rgba(240, 194, 127, 0.4)"
                : "rgba(75, 18, 72, 0.4)",
          },
        }}
      >
        <Typography
          className="bearing-value"
          sx={{
            fontSize: isMobile ? "1.8rem" : "2.2rem",
            fontWeight: 800,
            background: `linear-gradient(135deg, ${getPrimaryColor()}, ${getSecondaryColor()})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: "0 0 8px 0",
            fontFamily: "monospace",
            letterSpacing: "1px",
            animation: "pulse-text 2s ease-in-out infinite",
            "@keyframes pulse-text": {
              "0%, 100%": { opacity: 1 },
              "50%": { opacity: 0.8 },
            },
          }}
        >
          {bearingText}
        </Typography>
        <Typography
          className="bearing-label"
          sx={{
            fontSize: isMobile ? "0.85rem" : "0.95rem",
            opacity: 0.6,
            fontWeight: 500,
          }}
        >
          درجة الاتجاه من الشمال
        </Typography>
      </Box>
    </Box>
  );
}
