import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import Countries from "../../data.json";
import SearchIcon from "../../public/search.svg";
import SearchIconDark from "../../public/searchDark.svg";

const FilterAndSearch = ({
  countries,
  setCountries,
}: {
  countries: typeof Countries;
  setCountries: (countries: any) => void;
}) => {
  const filterCountries = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredCountries = countries.filter((country) => {
      return country.name.official
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setCountries(filteredCountries);
  };
  const [dropDownRegion, setDropDownRegion] =
    useState<string>("Filter by Region");

  useEffect(() => {
    if (dropDownRegion === "All") return;
    const region = countries.filter(
      (country) => country.region === dropDownRegion
    );
    setCountries(region);
  }, [dropDownRegion]);

  const renderRegionOptions = () => {
    const regions = [
      ...new Set(countries.map((country) => country.region).sort()),
    ];
    return regions.map((region) => (
      <Menu.Item>
        <button className="text-left" onClick={() => setDropDownRegion(region)}>
          {region}
        </button>
      </Menu.Item>
    ));
  };

  return (
    <div className="flex flex-col md:flex-row justify-between py-[48px]">
      <div className="max-w-[480px] w-full mr-4">
        <input
          className="shadow-md h-[56px] w-full rounded pl-[68px] dark:text-white dark:bg-primaryDark placeholder:dark:text-white"
          placeholder="Search for a country..."
          type="text"
          onChange={(e) => filterCountries(e)}
        />
        <img
          src={SearchIcon}
          className="h-[18px] relative -top-9 left-8 select-non dark:hidden"
          alt="Search Icon"
        />
        <img
          src={SearchIconDark}
          className="h-[18px] relative -top-9 left-8 select-non hidden dark:block"
          alt="Search Icon"
        />
      </div>
      <div>
        <Menu
          as="div"
          className="inline-block p-4 dark:bg-primaryDark rounded min-w-[200px] relative h-14  shadow"
        >
          <Menu.Button className="flex flex-row justify-between dark:text-white rounded text-center w-full h-full z-100">
            <span>{dropDownRegion}</span>
            <svg
              className="ml-4 mt-2 fill-black dark:fill-white"
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.45 1.45L5 4.9L1.55 1.45L0.5 2.5L5 7L9.5 2.5L8.45 1.45Z"
              />
            </svg>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute origin-center right-0 mt-[19px] bg-white dark:bg-primaryDark dark:text-white flex flex-col px-5 py-3 space-y-3 min-w-[200px] z-50 rounded shadow">
              {/* <Menu.Item>{({ active }) => <p>Africa</p>}</Menu.Item>
              <Menu.Item>{({ active }) => <p>America</p>}</Menu.Item>
              <Menu.Item>{({ active }) => <p>Asia</p>}</Menu.Item>
              <Menu.Item>{({ active }) => <p>Europe</p>}</Menu.Item>
              <Menu.Item>{({ active }) => <p>Oceania</p>}</Menu.Item> */}
              <Menu.Item>
                <button
                  className="text-left"
                  onClick={() => {
                    setCountries(countries);
                    setDropDownRegion("All");
                  }}
                >
                  All
                </button>
              </Menu.Item>
              {renderRegionOptions()}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default FilterAndSearch;
