import CountryList from "./components/CountryList";
import Header from "./components/Header";
import { setUserModeOnLoad } from "./utils/DarkMode";
setUserModeOnLoad();

const App = () => {
  return (
    <main className="flex flex-col justify-center bg-white dark:bg-bgDark">
      <Header />
      <CountryList />
    </main>
  );
};

export default App;
