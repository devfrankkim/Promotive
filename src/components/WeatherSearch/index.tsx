import { GEOOptions, GEO_URL } from "api/API_weather";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

type TLoadOptions = {
  city: string;
  country: string;
  countryCode: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  region: string;
  regionCode: string;
  type: string;
  wikiDataId: string;
};

const WeatherSearch = ({ onSearchChange }: any) => {
  const [search, setSearch] = useState("");

  const handleOnChange = (searchData: any) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  //  =========== Return 10 cities list ===========
  const loadOptions = async (inputValue: string) => {
    const response = await fetch(
      `${GEO_URL}/cities?limit=10&namePrefix=${inputValue}`,
      GEOOptions
    );

    const { data } = await response.json();

    return {
      options: data.map((city: TLoadOptions) => {
        return {
          label: `${city.name}, ${city.countryCode}`,
          latLong: ` ${city.latitude}, ${city.longitude}`,
        };
      }),
    };
  };

  return (
    <AsyncPaginate
      placeholder="Search for city..."
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions as any}
      debounceTimeout={600}
    />
  );
};

export default React.memo(WeatherSearch);
