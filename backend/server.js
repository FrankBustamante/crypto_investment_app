const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 4000;

app.use(cors());

const CMC_API_KEY = process.env.CMC_API_KEY;
const CMC_BASE_URL = "https://pro-api.coinmarketcap.com/v1";

app.get("/api/cryptos/latest", async (req, res) => {
    try {
        console.log(process.env.CMC_API_KEY);
        const response = await axios.get(`${CMC_BASE_URL}/cryptocurrency/listings/latest`, {
            headers: { "X-CMC_PRO_API_KEY": CMC_API_KEY },
            params: {
                start: 1,
                limit: 10,
                convert: "USD",
            },
        });

        res.json(response.data.data);
    } catch (err) {
        console.error("Error en /api/cryptos:", err.message);
        res.status(500).json({ error: "Error al obtener datos" });
    }
});


app.get("/api/cryptos", async (req, res) => {
    try {
        const response = await axios.get(`${CMC_BASE_URL}/cryptocurrency/listings/latest`, {
            headers: {
                "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY
            },
            params: {
                limit: 10,
                convert: "USD"
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener datos de CoinMarketCap" });
    }
});


app.get("/api/crypto/:symbol", async (req, res) => {
    const { symbol } = req.params;
    try {
        const response = await axios.get(`${CMC_BASE_URL}/cryptocurrency/quotes/latest`, {
            headers: { "X-CMC_PRO_API_KEY": CMC_API_KEY },
            params: {
                symbol: symbol.toUpperCase(),
                convert: "USD",
            },
        });

        res.json(response.data.data[symbol.toUpperCase()]);
    } catch (err) {
        console.error("Error en /api/crypto/:symbol:", err.message);
        res.status(500).json({ error: "Error al obtener datos" });
    }
});

app.get("/api/history", async (req, res) => {
    const { symbol, range } = req.query;

    try {
        const response = await axios.get(
            "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical",
            {
                headers: {
                    "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
                },
                params: {
                    symbol,
                    time_start: "2025-08-01", // ejemplo
                    time_end: "2025-09-01",  // ejemplo
                    interval: "daily",
                },
            }
        );

        // aquí puedes transformar los datos para que React reciba un JSON simple
        const history = response.data.data.quotes.map((q) => ({
            timestamp: q.timestamp,
            price: q.quote.USD.price,
            volume: q.quote.USD.volume_24h,
        }));

        res.json(history);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Error al obtener historial de precios" });
    }
});

app.get("/api/cryptos_top", async (req, res) => {
    try {
        const response = await axios.get(
            `${CMC_BASE_URL}/cryptocurrency/listings/latest`,
            {
                headers: { "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY },
                params: { start: 1, limit: 10, convert: "USD" },
            }
        );

        const cryptos = response.data.data.map((c) => ({
            id: c.id,
            name: c.name,
            symbol: c.symbol,
            price: c.quote.USD.price,
            marketCap: c.quote.USD.market_cap,
            volume: c.quote.USD.volume_24h,
            percentChange24h: c.quote.USD.percent_change_24h,
        }));

        console.log(cryptos)
        res.json(cryptos);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: "Error al obtener criptomonedas" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
