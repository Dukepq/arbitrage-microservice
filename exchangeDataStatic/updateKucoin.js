const fs = require("fs/promises");
const filePath = "/kucoin.json";

const updateBinance = async () => {
  const res = await fetch("https://api.kucoin.com/api/v2/symbols");
  const json = await res.json();
  console.log(json);
  const filtered = json.data
    .filter((item) => item.enableTrading)
    .map((item) => {
      const { symbol, enableTrading, baseCurrency, quoteCurrency } = item;
      return {
        market: symbol,
        status: enableTrading ? "trading" : "closed",
        base: baseCurrency,
        quote: quoteCurrency,
      };
    });
  const jsonData = JSON.stringify(filtered);

  fs.writeFile(__dirname + filePath, jsonData);
};
updateBinance();
