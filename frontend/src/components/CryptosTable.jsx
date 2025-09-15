import { useEffect, useState } from "react";


function CryptosTable({ cryptos}) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!cryptos) return;
        setLoading(false);
    }, [cryptos]);

    if (loading) {
        return <p className="text-cyan-400">Cargando Datos...</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-gray-200">
                <thead className="bg-gray-100 text-black">
                <tr>
                    <th className="px-4 py-2">Nombre</th>
                    <th className="px-4 py-2">Símbolo</th>
                    <th className="px-4 py-2">Precio (USD)</th>
                    <th className="px-4 py-2">Cambio 24h (%)</th>
                    <th className="px-4 py-2">Volumen 24h</th>
                </tr>
                </thead>
                <tbody>
                {cryptos.map((c) => (
                    <tr key={c.id} className="border-b">
                        <td className="px-4 py-2">{c.name}</td>
                        <td className="px-4 py-2">{c.symbol}</td>
                        <td className="px-4 py-2">${c.quote.USD.price.toFixed(2)}</td>
                        <td
                            className={`px-4 py-2 ${
                                c.quote.USD.percent_change_24h > 0 ? "text-green-600" : "text-red-600"
                            }`}
                        >
                            {c.quote.USD.percent_change_24h.toFixed(2)}%
                        </td>
                        <td className="px-4 py-2">${c.quote.USD.volume_24h.toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CryptosTable;