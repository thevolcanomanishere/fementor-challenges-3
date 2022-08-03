import Countries from "../../data.json";
import BackLight from "../../public/backLight.svg";
import BackDark from "../../public/backDark.svg";
import { addThoudsandSeparator } from "../utils";

const CountryDetail = ({
  country,
  clear,
}: {
  country: typeof Countries[number];
  clear: (clear: false) => void;
}) => {
  const renderNames = () => {
    if (!country.name.nativeName) {
      return country.name.common;
    }
    if (country.name.nativeName) {
      const keys = Object.keys(country.name.nativeName);

      return Object.values(country.name.nativeName)
        .map((name, index) => {
          return ` ${keys[index]}: ${name.common}`;
        })
        .join(", ");
    }
  };

  const renderCurrencies = () => {
    if (!country.currencies) return;
    return Object.values(country.currencies)
      .map((currency) => {
        return currency.name;
      })
      .join(", ");
  };

  const renderLanguages = () => {
    if (!country.languages) return;
    return Object.values(country.languages)
      .map((language) => {
        return language;
      })
      .join(", ");
  };

  const renderBorders = () => {
    if (!country.borders) return;
    const countries = country.borders.map((cca3) => {
      const country = Countries.find((country) => country.cca3 === cca3);
      console.log(country);
      if (country) return country.name.common;
    });
    return countries.map((country) => (
      <div className="px-2 py-1 shadow min-w-[96px] max-h-[28px] text-center text-sm">
        {country}
      </div>
    ));
  };

  return (
    <div className="flex flex-row justify-start space-x-20 mt-[80px]">
      <div className="flex flex-col space-y-10 w-1/2 self-start">
        <button
          onClick={() => clear(false)}
          className="flex flex-row space-x-2 "
        >
          <img className="dark:hidden" src={BackLight} alt="Back" />
          <img className="hidden dark:block" src={BackDark} alt="Back" />
          <span className="dark:text-white">Back</span>
        </button>
        <img
          className="max-h-[401px]"
          src={country.flags.svg}
          alt={country.name.official}
        />
      </div>
      <div className="flex flex-col w-1/2 justify-center dark:text-white">
        <div className="flex flex-col space-y-10">
          <h1 className="font-extrabold text-2xl">{country.name.official}</h1>
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-1/2">
              <span>
                <span className="font-[400]">Native name:</span>
                <span className="font-[300]">{renderNames()}</span>
              </span>
              <span>
                <span className="font-[400]">Population:</span>{" "}
                {addThoudsandSeparator(country.population)}
              </span>
              <span>
                <span className="font-[400]">Region:</span> {country.region}
              </span>
              <span>
                <span className="font-[400]">Sub Region:</span>{" "}
                {country.subregion}
              </span>
              <span>Capital: {country.capital}</span>
            </div>
            <div className="flex flex-col w-1/2">
              {country.tld && (
                <span>Top Level Domain: {country.tld.join(", ")}</span>
              )}
              {country.currencies && (
                <span>Currencies: {renderCurrencies()}</span>
              )}
              {country.languages && <span>Languages: {renderLanguages()}</span>}
            </div>
          </div>
          {country.borders && (
            <div className="flex flex-row">
              <span>Border Countries: </span>
              {renderBorders()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
