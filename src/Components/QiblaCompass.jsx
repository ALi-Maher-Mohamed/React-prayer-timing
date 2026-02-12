import React, { useMemo } from "react";
import { Box, CircularProgress } from "@mui/material";
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
      <div className="qibla-section">
        <h2 className="qibla-title">🧭 اتجاه القبلة</h2>
        <div className="qibla-loading">
          <CircularProgress
            size={48}
            sx={{ color: "#f0c27f" }}
          />
          <span className="loading-text">جاري تحديد موقعك...</span>
        </div>
      </div>
    );
  }

  // ── Error State ────────────────────────────────────────
  if (error) {
    return (
      <div className="qibla-section">
        <h2 className="qibla-title">🧭 اتجاه القبلة</h2>
        <Box
          className="qibla-error"
          sx={{
            bgcolor: "rgba(255,255,255,0.04)",
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.08)",
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
    <div className="qibla-section">
      <h2 className="qibla-title">🧭 اتجاه القبلة</h2>
      <p className="qibla-subtitle">الاتجاه نحو الكعبة المشرفة</p>

      <div className="compass-wrapper">
        {/* Compass ring — rotates with device heading */}
        <div
          className="compass-ring"
          style={{ transform: `rotate(${compassRotation}deg)` }}
        >
          {/* Tick marks */}
          <div className="tick-marks">
            {TICK_DEGREES.map((deg) => (
              <div
                key={deg}
                className={`tick ${deg % 90 === 0 ? "major" : ""}`}
                style={{ transform: `rotate(${deg}deg)` }}
              />
            ))}
          </div>

          {/* Inner decorative ring */}
          <div className="compass-inner-ring" />

          {/* Cardinal directions */}
          <span className="cardinal north">N</span>
          <span className="cardinal south">S</span>
          <span className="cardinal east">E</span>
          <span className="cardinal west">W</span>

          {/* Center dot */}
          <div className="compass-center-dot" />

          {/* Qibla arrow */}
          <div
            className="qibla-arrow"
            style={{ transform: `rotate(${arrowRotation}deg)` }}
          >
            <div className="kaaba-icon">🕋</div>
            <div className="arrow-head" />
            <div className="arrow-line" />
          </div>
        </div>
      </div>

      {/* Bearing readout */}
      <div className="bearing-info">
        <div className="bearing-value">{bearingText}</div>
        <div className="bearing-label">درجة الاتجاه من الشمال</div>
      </div>
    </div>
  );
}
