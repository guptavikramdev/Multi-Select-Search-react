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

  return (
    <div className="container">
      <MultiSelectInput
        option={country}
        placeholder="Select Country"
        selectedItems={selectedUser}
        onChange={(selected) => setSelectedUser(selected)}
      />
      <MultiSelectInput
        option={country}
        placeholder="Select Country"
        selectedItems={selectedUser}
        onChange={(selected) => setSelectedUser(selected)}
      />
    </div>
  );
}

export default App;
