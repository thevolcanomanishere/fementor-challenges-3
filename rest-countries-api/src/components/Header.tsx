import { useState } from "react";
import { toggleDarkMode } from "../utis/DarkMode";
import DarkMode from "../../public/darkMode.svg";
import LightMode from "../../public/lightMode.svg";

const Header = () => {
  const currentMode =
    localStorage.getItem("color-theme") === "dark" ? true : false;
  const [isDarkMode, setIsDarkMode] = useState(currentMode);

  return (
    <header className="flex h-[80px] border-b w-full bg-white dark:bg-primaryDark shadow-md">
      <div className="flex flex-row w-full h-full justify-between py-[23px] sm:pl-[81px]">
        <h1 className="text-black dark:text-white w-full pl-2 font-[900] text-[14px] sm:text-[18px] md:text-[24px] min-w-[135px]">
          Where in the world?
        </h1>
        {isDarkMode ? (
          <div className="flex flex-row w-full justify-end cursor-pointer select-none">
            <p
              className="text-black dark:text-white pr-2 md:pr-[80px] font-[400] text-[16px]"
              onClick={() => {
                setIsDarkMode(!isDarkMode);
                toggleDarkMode();
              }}
            >
              <div className="flex flex-row space-x-3 select-none">
                <img className="h-4 w-4 mt-1" src={DarkMode} alt="Dark mode" />
                <span>Dark Mode</span>
              </div>
            </p>
          </div>
        ) : (
          <div className="flex flex-row w-full justify-end cursor-pointer select-none">
            <p
              className="text-black dark:text-white pr-2 md:pr-[80px] font-[400] text-[16px]"
              onClick={() => {
                setIsDarkMode(!isDarkMode);
                toggleDarkMode();
              }}
            >
              <div className="flex flex-row space-x-3 select-none">
                <img className="h-4 w-4 mt-1" src={LightMode} alt="Dark mode" />
                <span>Dark Mode</span>
              </div>
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
