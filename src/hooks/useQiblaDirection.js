/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

/**
 * هوك لجلب اتجاه القبلة + اتجاه الجهاز
 * يعتمد على:
 * - Geolocation API
 * - DeviceOrientation API
 */
export function useQiblaDirection() {
  const [direction, setDirection] = useState(null);
  const [deviceHeading, setDeviceHeading] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── 1. جلب موقع المستخدم ───────────────────────────────
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("المتصفح لا يدعم تحديد الموقع");
      setLoading(false);
      return;
    }

    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;

      // حساب اتجاه القبلة (تقريبي)
      // الكعبة: 21.4225° N, 39.8262° E
      const kaabaLat = 21.4225;
      const kaabaLng = 39.8262;

      const toRadians = (deg) => (deg * Math.PI) / 180;
      const toDegrees = (rad) => (rad * 180) / Math.PI;

      const phi1 = toRadians(latitude);
      const phi2 = toRadians(kaabaLat);
      const lambda1 = toRadians(longitude);
      const lambda2 = toRadians(kaabaLng);

      const y = Math.sin(lambda2 - lambda1) * Math.cos(phi2);
      const x =
        Math.cos(phi1) * Math.sin(phi2) -
        Math.sin(phi1) * Math.cos(phi2) * Math.cos(lambda2 - lambda1);
      let bearing = toDegrees(Math.atan2(y, x));

      bearing = (bearing + 360) % 360; // تحويل للنطاق 0–360

      setDirection(bearing);
      setLoading(false);
    };

    const handleError = (err) => {
      setError(err.message || "حدث خطأ أثناء جلب الموقع");
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  }, []);

  // ── 2. متابعة اتجاه الجهاز (البوصلة) ────────────────────
  useEffect(() => {
    if (!window.DeviceOrientationEvent) {
      console.warn("الجهاز لا يدعم حساسية الاتجاه");
      return;
    }

    const handleOrientation = (event) => {
      // alpha = الاتجاه بالنسبة للشمال المغناطيسي (0–360)
      let heading = event.alpha;

      if (heading !== null) {
        // بعض الأجهزة تحتاج تصحيح عكسي
        heading = 360 - heading;
        setDeviceHeading(heading);
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return {
    direction, // اتجاه القبلة (درجة من الشمال)
    deviceHeading, // اتجاه الجهاز الحالي
    loading,
    error,
  };
}
