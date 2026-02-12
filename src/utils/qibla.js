/**
 * Qibla Direction Utility
 * Calculates the bearing from any point on Earth to the Kaaba in Makkah
 * using the spherical trigonometry forward azimuth formula.
 */

// Kaaba coordinates (Masjid al-Haram, Makkah)
const MAKKAH_LAT = 21.4225;
const MAKKAH_LNG = 39.8262;

/** Convert degrees to radians */
const toRadians = (deg) => (deg * Math.PI) / 180;

/** Convert radians to degrees */
const toDegrees = (rad) => (rad * 180) / Math.PI;

/**
 * Calculate the Qibla bearing from a given location.
 *
 * Uses the forward azimuth formula:
 *   θ = atan2(
 *         sin(Δlong) · cos(lat2),
 *         cos(lat1) · sin(lat2) − sin(lat1) · cos(lat2) · cos(Δlong)
 *       )
 *
 * @param {number} lat - User latitude in degrees
 * @param {number} lng - User longitude in degrees
 * @returns {number} Bearing in degrees (0–360), where 0 = North, 90 = East
 */
export function calculateQiblaDirection(lat, lng) {
  const lat1 = toRadians(lat);
  const lat2 = toRadians(MAKKAH_LAT);
  const deltaLng = toRadians(MAKKAH_LNG - lng);

  const x = Math.sin(deltaLng) * Math.cos(lat2);
  const y =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);

  const bearing = toDegrees(Math.atan2(x, y));

  // Normalize to 0–360
  return (bearing + 360) % 360;
}

export { MAKKAH_LAT, MAKKAH_LNG };
