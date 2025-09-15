import { useState } from "react";

function CryptoSelector({ options = [], onSelect }) {
    const [selected, setSelected] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setSelected(value);
        onSelect(value);
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <label
                htmlFor="crypto"
                className="block text-sm text-center font-medium text-gray-200 mb-2"
            >
                Selecciona una criptomoneda
            </label>
            <select
                id="crypto"
                value={selected}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-600 bg-gray-800 text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
                <option value="" disabled>
                    -- Elige una opción --
                </option>
                {options.map((crypto) => (
                    <option key={crypto.id} value={crypto.symbol}>
                        {crypto.name} ({crypto.symbol})
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CryptoSelector;