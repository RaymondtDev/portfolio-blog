export const getWeatherIcon = (code) => {
  if (code === 0) return "sun-color.svg";
  if (code >= 1 && code <= 3) return "cloud-sun-color.svg";
  if (code === 45 || code === 48) return "cloud-fog-color.svg";
  if (code >= 51 && code <= 67) return "cloud-drizzle-color.svg";
  if (code >= 80 && code <= 82) return "cloud-rain-color.svg";
  if (code >= 95) return "cloud-lightning-color.svg";
  return "cloud-color.svg";
}