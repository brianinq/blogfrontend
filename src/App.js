import { useState, useEffect } from "react";
import "./App.css";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    //get user details if logged in
    const token = localStorage.getItem("token");
    fetch("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function onLogin(obj) {
    localStorage.setItem("token", obj.jwt);
    setUser(obj.user);
  }

  if (!user) return <Login onLogin={onLogin} />;

  return <div className="App">Hello {user.name}</div>;
}

export default App;
