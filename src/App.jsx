import { useState, useEffect, useRef } from "react";
import "./App.css";
import MultiSelectInput from "./components/MultiSelectInput";

function App() {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const divRef = useRef();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://dummyjson.com/users`);
      const data = await response.json();
      setUserList(data.users);
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (divRef.current) {
      divRef.current.innerHTML = `<code>${JSON.stringify(selectedUser)}</code>`;
    }
  }, [selectedUser]);
  return (
    <div className="conatiner">
      <div className="results">
        <h2>Multi Select Search</h2>
        <div ref={divRef}></div>
      </div>

      <MultiSelectInput
        userList={userList}
        onChange={(data) => setSelectedUser(data)}
      />
    </div>
  );
}

export default App;
