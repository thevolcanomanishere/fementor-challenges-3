import { useState } from "react";
import { toggleDarkMode } from "../utis/DarkMode";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <header className="flex h-[80px] border-b w-full bg-white dark:bg-primaryDark shadow-md">
      <div className="flex flex-row w-full h-full justify-between py-[23px] sm:pl-[81px]">
        <h1 className="text-black dark:text-white font-[900] text-[14px] sm:text-[24px] max-w-[234px] min-w-[135px]">
          Where in the world?
        </h1>
        {isDarkMode ? (
          <p
            className="text-black dark:text-white pr-[80px] font-[400] text-[16px]"
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              toggleDarkMode();
            }}
          >
            Dark Mode
          </p>
        ) : (
          <p
            className="text-black dark:text-white pr-[80px] font-[400] text-[16px]"
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              toggleDarkMode();
            }}
          >
            Dark Mode
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;
