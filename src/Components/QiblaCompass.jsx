import React, { useMemo } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CompassCalibrationIcon from "@mui/icons-material/CompassCalibration";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useQiblaDirection } from "../hooks/useQiblaDirection";
import "./QiblaCompass.css"; // ← لو لسه بتستخدم css خارجي

const TICK_DEGREES = Array.from({ length: 12 }, (_, i) => i * 30);

export default function QiblaCompass() {
  const { direction, loading, error, deviceHeading } = useQiblaDirection();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDark = theme.palette.mode === "dark";

  const primary = isDark ? "#f0c27f" : "#4b1248";
  const secondary = isDark ? "#fc5c7d" : "#7d2f7f";

  const compassRotation = useMemo(
    () => (deviceHeading != null ? -deviceHeading : 0),
    [deviceHeading],
  );

  const arrowRotation = useMemo(
    () => (direction != null ? direction : 0),
    [direction],
  );

  const bearingText = useMemo(
    () => (direction != null ? `${direction.toFixed(1)}°` : "—"),
    [direction],
  );

  if (loading) {
    return (
      <Box sx={{ mt: isMobile ? 4 : 6, textAlign: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            mb: 3,
          }}
        >
          <CompassCalibrationIcon
            sx={{ fontSize: isMobile ? "2.2rem" : "2.8rem", color: primary }}
          />
          <Typography variant="h5" sx={{ fontWeight: 700, color: primary }}>
            اتجاه القبلة
          </Typography>
        </Box>

        <CircularProgress size={60} sx={{ color: primary }} />
        <Typography sx={{ mt: 2, opacity: 0.7 }}>
          جاري تحديد الاتجاه...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: isMobile ? 4 : 6, textAlign: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            mb: 3,
          }}
        >
          <CompassCalibrationIcon
            sx={{
              fontSize: isMobile ? "2.2rem" : "2.8rem",
              color: "error.main",
            }}
          />
          <Typography variant="h5" color="error">
            اتجاه القبلة
          </Typography>
        </Box>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: isMobile ? 4 : 6 }}>
      {/* العنوان */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          mb: 1,
        }}
      >
        <CompassCalibrationIcon
          sx={{ fontSize: isMobile ? "2.2rem" : "2.8rem", color: primary }}
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: `linear-gradient(135deg, ${primary}, ${secondary})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          اتجاه القبلة
        </Typography>
      </Box>

      {/* وصف صغير */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          mb: 4,
          opacity: 0.7,
        }}
      >
        <StorefrontIcon fontSize="small" />
        <Typography variant="body2">نحو الكعبة المشرفة</Typography>
      </Box>

      {/* البوصلة نفسها */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <div
          className="compass-wrapper"
          style={{
            width: isMobile ? 220 : 280,
            height: isMobile ? 220 : 280,
          }}
        >
          <div
            className="compass-ring"
            style={{ transform: `rotate(${compassRotation}deg)` }}
          >
            {/* علامات الدرجات */}
            <div className="tick-marks">
              {TICK_DEGREES.map((deg) => (
                <div
                  key={deg}
                  className={`tick ${deg % 90 === 0 ? "major" : ""}`}
                  style={{ transform: `rotate(${deg}deg)` }}
                />
              ))}
            </div>

            {/* النقاط الأساسية */}
            <span className="cardinal north">N</span>
            <span className="cardinal south">S</span>
            <span className="cardinal east">E</span>
            <span className="cardinal west">W</span>

            {/* السهم */}
            <div
              className="qibla-arrow"
              style={{ transform: `rotate(${arrowRotation}deg)` }}
            >
              <div className="kaaba-icon">🕋</div>
            </div>
          </div>
        </div>
      </Box>

      {/* القراءة الرقمية */}
      <Box
        sx={{
          textAlign: "center",
          p: 3,
          borderRadius: 3,
          bgcolor: isDark ? "rgba(240,194,127,0.08)" : "rgba(75,18,72,0.08)",
          border: `1px solid ${isDark ? "rgba(240,194,127,0.2)" : "rgba(75,18,72,0.2)"}`,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "monospace",
            fontWeight: 800,
            color: primary,
          }}
        >
          {bearingText}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          درجة الاتجاه من الشمال
        </Typography>
      </Box>
    </Box>
  );
}
