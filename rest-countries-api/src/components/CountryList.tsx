import React, { useEffect, useState } from "react";
import Countries from "../../data.json";
import FilterAndSearch from "./FilterAndSearch";

const CountryList = () => {
  const [countries, setCountries] = useState<typeof Countries>([]);
  const [filteredCountries, setFilteredCountries] =
    useState<typeof Countries>();

  useEffect(() => {
    const timer = setTimeout(() => {
      const sorted = Countries.sort((a, b) =>
        a.name.official.localeCompare(b.name.official)
      );
      setCountries(sorted);
      setFilteredCountries(sorted);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const addThoudsandSeparator = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="flex flex-col h-full px-10 md:px-[80px]">
      <div>
        <FilterAndSearch
          countries={countries}
          setCountries={setFilteredCountries}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 self-center">
        {filteredCountries &&
          filteredCountries.map((country) => (
            <div
              className="flex flex-col shadow-md rounded-b-md w-[264px] h-[336px]"
              key={country.name.official}
            >
              <img
                className="max-h-[160px] h-full w-full mx-auto rounded-t-md"
                src={country.flags.svg}
                alt={`${country.name.official} flag`}
              />
              <div className="pl-[24px]">
                <h2 className="font-[800] font-[18px] pt-[24px] pb-[16px]">
                  {country.name.official}
                </h2>
                <p>
                  <span className="font-[600]">Population:</span>{" "}
                  {addThoudsandSeparator(country.population)}
                </p>
                <p>
                  <span className="font-[600]">Region:</span> {country.region}
                  <p></p>
                  <span className="font-[600]">Capital:</span> {country.capital}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CountryList;
