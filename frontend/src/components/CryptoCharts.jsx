import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CryptoChart = () => {
    const [cryptos, setCryptos] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/cryptos_top")
            .then((res) => {
                setCryptos(res.data)
            })
            .catch((err) => console.error("Error al traer cryptos:", err));

    }, []);

    if (cryptos.length === 0) return <p>Cargando...</p>;

    const data = {
        labels: cryptos.map((c) => c.symbol),
        datasets: [
            {
                label: "Market Cap (USD)",
                data: cryptos.map((c) => c.marketCap),
                backgroundColor: "rgba(75, 192, 192, 0.7)",
            },
        ],
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">Top 10 Criptos por Market Cap</h2>
            <Bar data={data} />
        </div>
    );
};


export default CryptoChart;