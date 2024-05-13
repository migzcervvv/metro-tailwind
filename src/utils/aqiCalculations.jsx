export const convertCOtoAQI = (co) => {
  let c = parseFloat(co);
  let aqi;
  if (c >= 0 && c <= 4.4) {
    aqi = (50 / 4.4) * c;
  } else if (c >= 4.5 && c <= 9.4) {
    aqi = (50 / (9.4 - 4.5)) * (c - 4.5) + 51;
  } else if (c >= 9.5 && c <= 12.4) {
    aqi = (50 / (12.4 - 9.5)) * (c - 9.5) + 101;
  } else if (c >= 12.5 && c <= 15.4) {
    aqi = (50 / (15.4 - 12.5)) * (c - 12.5) + 151;
  } else if (c >= 15.5 && c <= 30.4) {
    aqi = (100 / (30.4 - 15.5)) * (c - 15.5) + 201;
  } else if (c >= 30.5 && c <= 40.4) {
    aqi = (100 / (40.4 - 30.5)) * (c - 30.5) + 301;
  } else if (c >= 40.5) {
    aqi = (100 / (50.4 - 40.5)) * (c - 40.5) + 401;
  } else {
    aqi = -1; // invalid value
  }
  return Math.round(Math.max(0, Math.min(500, aqi))); // Ensure AQI is within bounds
};

export const convertO3toAQI = (o3) => {
  let c = parseFloat(o3) * 1000; // Convert to ppb for calculation
  let aqi;
  if (c >= 0 && c <= 54) {
    aqi = (50 / 54) * c;
  } else if (c >= 55 && c <= 70) {
    aqi = (50 / (70 - 55)) * (c - 55) + 51;
  } else if (c >= 71 && c <= 85) {
    aqi = (50 / (85 - 71)) * (c - 71) + 101;
  } else if (c >= 86 && c <= 105) {
    aqi = (50 / (105 - 86)) * (c - 86) + 151;
  } else if (c >= 106 && c <= 200) {
    aqi = (100 / (200 - 106)) * (c - 106) + 201;
  } else {
    aqi = -1; // invalid value
  }
  return Math.round(Math.max(0, Math.min(500, aqi))); // Ensure AQI is within bounds
};

export const convertPM10toAQI = (pm10) => {
  let c = parseFloat(pm10);
  let aqi;
  if (c >= 0 && c <= 54) {
    aqi = (50 / 54) * c;
  } else if (c >= 55 && c <= 154) {
    aqi = (50 / (154 - 55)) * (c - 55) + 51;
  } else if (c >= 155 && c <= 254) {
    aqi = (50 / (254 - 155)) * (c - 155) + 101;
  } else if (c >= 255 && c <= 354) {
    aqi = (50 / (354 - 255)) * (c - 255) + 151;
  } else if (c >= 355 && c <= 424) {
    aqi = (100 / (424 - 355)) * (c - 355) + 201;
  } else if (c >= 425 && c <= 504) {
    aqi = (100 / (504 - 425)) * (c - 425) + 301;
  } else if (c >= 505) {
    aqi = (100 / (604 - 505)) * (c - 505) + 401;
  } else {
    aqi = -1; // invalid value
  }
  return Math.round(Math.max(0, Math.min(500, aqi))); // Ensure AQI is within bounds
};

export const convertPM25toAQI = (pm25) => {
  let c = parseFloat(pm25);
  let aqi;
  if (c >= 0 && c <= 12) {
    aqi = (50 / 12) * c;
  } else if (c >= 12.1 && c <= 35.4) {
    aqi = (50 / (35.4 - 12.1)) * (c - 12.1) + 51;
  } else if (c >= 35.5 && c <= 55.4) {
    aqi = (50 / (55.4 - 35.5)) * (c - 35.5) + 101;
  } else if (c >= 55.5 && c <= 150.4) {
    aqi = (50 / (150.4 - 55.5)) * (c - 55.5) + 151;
  } else if (c >= 150.5 && c <= 250.4) {
    aqi = (100 / (250.4 - 150.5)) * (c - 150.5) + 201;
  } else if (c >= 250.5 && c <= 350.4) {
    aqi = (100 / (350.4 - 250.5)) * (c - 250.5) + 301;
  } else if (c >= 350.5 && c <= 500.4) {
    aqi = (100 / (500.4 - 350.5)) * (c - 350.5) + 401;
  } else {
    aqi = -1; // invalid value
  }
  return Math.round(Math.max(0, Math.min(500, aqi))); // Ensure AQI is within bounds
};
