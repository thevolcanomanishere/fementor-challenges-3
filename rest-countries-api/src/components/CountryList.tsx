import React, { useEffect, useState } from "react";
import Countries from "../../data.json";
import CountryDetail from "./CountryDetail";
import FilterAndSearch from "./FilterAndSearch";
import { addThoudsandSeparator } from "../utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const CountryList = () => {
  const [countries, setCountries] = useState<typeof Countries>([]);
  const [filteredCountries, setFilteredCountries] =
    useState<typeof Countries>();
  const [selectedCountry, setSelectedCountry] = useState<
    typeof Countries[number] | false
  >(false);
  const [animationParent] = useAutoAnimate({
    duration: 250,
    easing: "ease-out",
  });
  const [animationItems] = useAutoAnimate({
    duration: 500,
    easing: "ease-out",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const sorted = Countries.sort((a, b) =>
        a.name.official.localeCompare(b.name.official)
      );
      setCountries(sorted);
      setFilteredCountries(sorted);
    }, 1);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      // @ts-ignore
      ref={animationParent}
      className="flex flex-col h-full px-10 md:px-[95px]"
    >
      {selectedCountry ? (
        <CountryDetail country={selectedCountry} clear={setSelectedCountry} />
      ) : (
        <div>
          <FilterAndSearch
            countries={countries}
            setCountries={setFilteredCountries}
          />
        </div>
      )}

      <div
        // @ts-ignore
        ref={animationItems}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-16 self-center"
      >
        {!selectedCountry &&
          filteredCountries &&
          filteredCountries.map((country) => (
            <div
              onClick={() => setSelectedCountry(country)}
              className="flex flex-col shadow-md rounded-t-md rounded-b-md w-[264px] h-[336px] dark:bg-primaryDark dark:text-white"
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
