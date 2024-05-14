import countries from "world-countries";

// Formatting the country data from the "world-countries" package.
const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region
}));

/**
 * Custom hook to handle country data.
 * 
 * @returns {{
 *    getAll,
 *    getByValue
 * }} The methods to retrieve country data.
*/
const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  }
  
  return { 
    getAll, 
    getByValue }
};

export default useCountries;