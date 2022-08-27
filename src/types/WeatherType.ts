export interface WeatherContainer {}

export interface WeatherResponse {
  city: City;
  cod: string;
  message: number;
  cnt: number;
  weather: WeatherDetailIcon[];
}

export interface SunSystem {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface WeatherDescription {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  weather: WeatherDetailIcon[];
  speed: number;
  deg: number;
  gust: number;
  clouds: number;
  pop: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface WeatherDetailIcon {
  id: number;
  main: string;
  description: string;
  icon: string;
}
