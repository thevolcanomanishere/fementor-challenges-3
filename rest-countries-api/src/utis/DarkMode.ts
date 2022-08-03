export const toggleDarkMode = () => {
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-bgDark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-bgDark");
      localStorage.setItem("color-theme", "light");
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-primaryDark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-primaryDark");
      localStorage.setItem("color-theme", "dark");
    }
  }
};

export const getCurrentMode = () => localStorage.getItem("color-theme");
