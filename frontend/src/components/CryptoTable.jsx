import { useEffect, useState } from "react";
import axios from "axios";

function CryptoTable({ symbol, range = "7d" }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!symbol) return;

        setLoading(true);
        axios
            .get(`http://localhost:4000/api/history?symbol=${symbol}&range=${range}`)
            .then((res) => {
                setHistory(res.data);
                console.log("datos consultados: ",res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al traer historial:", err);
                setLoading(false);
            });
    }, [symbol, range]);

    if (!symbol) {
        return <p className="text-gray-400">Selecciona una criptomoneda.</p>;
    }

    if (loading) {
        return <p className="text-cyan-400">Cargando historial...</p>;
    }

    return (
        <div className="mt-6 overflow-x-auto">
            <h2 className="text-xl font-bold mb-4 text-white">
                Historial de {symbol} ({range})
            </h2>
            <table className="w-full border-collapse bg-gray-800 rounded-lg shadow-md">
                <thead>
                <tr className="bg-gray-700 text-gray-200">
                    <th className="p-3 text-left">Fecha</th>
                    <th className="p-3 text-left">Precio (USD)</th>
                    <th className="p-3 text-left">Volumen 24h</th>
                </tr>
                </thead>
                <tbody>


                {history.map((item, index) => (
                    <tr
                        key={index}
                        className="border-b border-gray-700 hover:bg-gray-700 transition"
                    >
                        <td className="p-3">{new Date(item.timestamp).toLocaleDateString()}</td>
                        <td className="p-3">${item.price.toFixed(2)}</td>
                        <td className="p-3">{item.volume.toLocaleString()}</td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    );
}

export default CryptoTable;