import './App.css';
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    axios
        .get("http://localhost:4000/api/cryptos")
        .then((res) => setCryptos(res.data.data))
        .catch((err) => console.error("Error al traer cryptos:", err));
  }, []);

  return (
      <Dashboard cryptos={cryptos} />
  );
}

export default App;
