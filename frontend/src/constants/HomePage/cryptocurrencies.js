import { green, red } from "@mui/material/colors";

const cryptocurrencies = [
    { name: "Bitcoin", symbol: "BTC", price: "101,213,123.11", change: "+12.21%", color: green[500], icon: "🟠" },
    { name: "Bitcoin Cash", symbol: "BCH", price: "80,213,123.11", change: "-12.21%", color: red[500], icon: "🟢" },
    { name: "Ethereum", symbol: "ETH", price: "40,213,222.11", change: "+12.21%", color: green[500], icon: "⚫" },
    { name: "Ethereum Classic", symbol: "ETC", price: "234,123.11", change: "+13.24%", color: green[500], icon: "🟢" },
    { name: "Litecoin", symbol: "LTC", price: "113,123.11", change: "-12.21%", color: red[500], icon: "🔵" },
    { name: "0x", symbol: "ZRX", price: "103,123.11", change: "+12.21%", color: green[500], icon: "⚫" },
    { name: "Basic Attention Token", symbol: "BAT", price: "100,123.11", change: "-24.33%", color: red[500], icon: "🟠" },
    { name: "Decentraland", symbol: "MANA", price: "63,163.41", change: "+12.21%", color: green[500], icon: "🎨" },
    { name: "Kyber Network", symbol: "KNC", price: "17,123.12", change: "-1.21%", color: red[500], icon: "🟢" },
    { name: "Chainlink", symbol: "LINK", price: "10,123.11", change: "+22.21%", color: green[500], icon: "🔷" },
];

export default cryptocurrencies;