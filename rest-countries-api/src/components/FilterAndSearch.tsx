import { Menu } from "@headlessui/react";
import React from "react";
import Countries from "../../data.json";
import SearchIcon from "../../public/search.svg";

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

  return (
    <div className="flex flex-col md:flex-row justify-between py-[48px]">
      <div className="max-w-[480px] w-full">
        <input
          className="shadow-md h-[56px] w-full rounded pl-[68px]"
          placeholder="Search for a country..."
          type="text"
          onChange={(e) => filterCountries(e)}
        />
        <img
          src={SearchIcon}
          className="h-[18px] relative -top-9 left-8 select-none"
          alt="Search Icon"
        />
      </div>
      <h1>Hello</h1>
      {/* <div>
        <Menu>
          <Menu.Button>More</Menu.Button>
          <Menu.Items>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && "bg-blue-500"}`}
                  href="/account-settings"
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && "bg-blue-500"}`}
                  href="/account-settings"
                >
                  Documentation
                </a>
              )}
            </Menu.Item>
            <Menu.Item disabled>
              <span className="opacity-75">Invite a friend (coming soon!)</span>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div> */}
    </div>
  );
};

export default FilterAndSearch;
