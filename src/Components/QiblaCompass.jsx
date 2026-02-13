import React, { useMemo } from "react";
import { Box, CircularProgress, useTheme, useMediaQuery } from "@mui/material";
import { useQiblaDirection } from "../hooks/useQiblaDirection";
import "./QiblaCompass.css";

// Pre-computed tick mark rotation values (every 30°)
const TICK_DEGREES = Array.from({ length: 12 }, (_, i) => i * 30);

/**
 * QiblaCompass — displays a compass circle with an arrow pointing
 * toward Makkah. Supports device orientation for real-time rotation.
 */
export default function QiblaCompass() {
  const { direction, loading, error, deviceHeading } = useQiblaDirection();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      <div
        className="qibla-section"
        style={{ marginTop: isMobile ? "30px" : "50px" }}
      >
        <h2 className="qibla-title">🧭 اتجاه القبلة</h2>
        <div className="qibla-loading">
          <CircularProgress
            size={48}
            sx={{
              color: theme.palette.mode === "dark" ? "#f0c27f" : "#4b1248",
            }}
          />
          <span className="loading-text">جاري تحديد موقعك...</span>
        </div>
      </div>
    );
  }

  // ── Error State ────────────────────────────────────────
  if (error) {
    return (
      <div
        className="qibla-section"
        style={{ marginTop: isMobile ? "30px" : "50px" }}
      >
        <h2 className="qibla-title">🧭 اتجاه القبلة</h2>
        <Box
          className="qibla-error"
          sx={{
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(240, 194, 127, 0.05)"
                : "rgba(75, 18, 72, 0.05)",
            borderRadius: 3,
            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(240, 194, 127, 0.2)"
                : "1px solid rgba(75, 18, 72, 0.2)",
            padding: "20px",
          }}
        >
          <div className="error-icon">📍</div>
          <p className="error-text">{error}</p>
        </Box>
      </div>
    );
  }

  // ── Compass ────────────────────────────────────────────
  return (
    <div
      className="qibla-section"
      style={{ marginTop: isMobile ? "30px" : "50px" }}
    >
      <h2 className="qibla-title">🧭 اتجاه القبلة</h2>
      <p className="qibla-subtitle">الاتجاه نحو الكعبة المشرفة</p>

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

      {/* Bearing readout */}
      <div className="bearing-info">
        <div
          className="bearing-value"
          style={{
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #f0c27f, #fc5c7d)"
                : "linear-gradient(135deg, #4b1248, #7d2f7f)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {bearingText}
        </div>
        <div className="bearing-label">درجة الاتجاه من الشمال</div>
      </div>
    </div>
  );
}
