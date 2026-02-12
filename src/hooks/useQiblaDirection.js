import { useState, useEffect, useMemo, useCallback } from "react";
import { calculateQiblaDirection } from "../utils/qibla";

/**
 * Custom hook that handles geolocation, Qibla bearing computation,
 * and optional device orientation tracking.
 *
 * @returns {{ direction: number|null, loading: boolean, error: string|null, deviceHeading: number|null }}
 */
export function useQiblaDirection() {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deviceHeading, setDeviceHeading] = useState(null);

  // ── Geolocation ──────────────────────────────────────────────
  const handleSuccess = useCallback((position) => {
    setCoords({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    setLoading(false);
  }, []);

  const handleError = useCallback((err) => {
    const messages = {
      1: "تم رفض إذن الموقع. يرجى تفعيله من إعدادات المتصفح.",
      2: "تعذّر تحديد الموقع. تأكد من تفعيل GPS.",
      3: "انتهت مهلة طلب الموقع. حاول مرة أخرى.",
    };
    setError(messages[err.code] || "حدث خطأ غير معروف أثناء تحديد الموقع.");
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("متصفحك لا يدعم خدمة تحديد الموقع.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // cache for 5 min
    });
  }, [handleSuccess, handleError]);

  // ── Device Orientation (bonus) ──────────────────────────────
  useEffect(() => {
    const handleOrientation = (event) => {
      // event.alpha = compass heading (0–360) on supported devices
      if (event.alpha != null) {
        setDeviceHeading(event.alpha);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, []);

  // ── Qibla Bearing (memoized) ────────────────────────────────
  const direction = useMemo(() => {
    if (!coords) return null;
    return calculateQiblaDirection(coords.lat, coords.lng);
  }, [coords]);

  return { direction, loading, error, deviceHeading };
}
