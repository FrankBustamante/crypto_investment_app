import CryptoTable from "../components/CryptoTable";
import CryptoChart from "../components/CryptoCharts";
import CryptoSelector from "../components/CryptoSelector";

import { useState } from "react";
import CryptosTable from "../components/CryptosTable";

function Dashboard({ cryptos }) {
    const [selectedCrypto, setSelectedCrypto] = useState(null);

    const handleSelect = (symbol) => {
        setSelectedCrypto(symbol);
    };

    return (
        <div className="bg-gray-800 w-full h-full">

            <div className="min-h-screen bg-gray-900 text-white p-8">
                <h1 className="text-3xl font-bold mb-8 text-center text-cyan-400">
                    🚀 Crypto Investment Dashboard
                </h1>

                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Selector */}
                    <div className="bg-gray-800 p-4 rounded-lg shadow">

                        <CryptoSelector options={cryptos} onSelect={handleSelect} />

                        {selectedCrypto && (
                            <p className="mt-4 text-cyan-400">
                                Seleccionaste: <strong>{selectedCrypto}</strong>
                            </p>
                        )}
                    </div>

                    {/* Tabla de Historial  */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow">
                        <CryptoTable symbol={selectedCrypto} range="7d" />
                    </div>

                    {/* Tabla de top 10 cryptos  */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow">
                        <CryptosTable cryptos={cryptos} />
                    </div>

                    {/* Grafica de las top 10 criptos */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow">
                        <CryptoChart />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;