import CountryList from "./components/CountryList";
import Header from "./components/Header";

const App = () => {
  return (
    <main className="flex flex-col justify-center">
      <Header />
      <CountryList />
    </main>
  );
};

export default App;
