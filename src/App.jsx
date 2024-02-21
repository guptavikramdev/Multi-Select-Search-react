import { useState, useEffect } from "react";
import "./App.css";
import MultiSelectInput from "./components/MultiSelectInput";

function App() {
  const [country, setCountry] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  useEffect(() => {
    async function fetchCountry() {
      const response = await fetch("https://laravel-world.com/api/countries");
      const country = await response.json();
      setCountry(country.data);
    }
    fetchCountry();
  }, []);
  const getYearRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  return (
    <div className="container">
      
      <MultiSelectInput
        option={country}
        placeholder="Select Country"
        selectedItems={selectedUser}
        onChange={(selected) => setSelectedUser(selected)}
      />
      <MultiSelectInput
        option={getYearRange(2024, 2024 - 10, -1)}
        placeholder="Select Year"
        selectedItems={selectedUser}
        onChange={(selected) => setSelectedUser(selected)}
      />
    </div>
  );
}

export default App;
