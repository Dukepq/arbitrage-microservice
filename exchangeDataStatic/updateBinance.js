const fs = require("fs/promises");
const filePath = "/binance.json";

const updateBinance = async () => {
  const res = await fetch("https://www.binance.com/api/v3/exchangeInfo");
  const json = await res.json();
  const filtered = json.symbols
    .filter((item) => item.status.toLowerCase() === "trading")
    .map((item) => {
      const { symbol, status, baseAsset, quoteAsset } = item;
      return {
        market: symbol,
        status,
        base: baseAsset,
        quote: quoteAsset,
      };
    });
  const jsonData = JSON.stringify(filtered);

  fs.writeFile(__dirname + filePath, jsonData);
};
updateBinance();
