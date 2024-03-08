const fs = require("fs/promises");
const filePath = "/bitvavo.json";

const updateBitvavo = async () => {
  const res = await fetch("https://api.bitvavo.com/v2/markets");
  const json = await res.json();
  const filtered = json
    .filter((item) => item.status.toLowerCase() === "trading")
    .map((item) => {
      return {
        market: item.market,
        status: item.status,
        base: item.base,
        quote: item.quote,
      };
    });
  const jsonData = JSON.stringify(filtered);

  fs.writeFile(__dirname + filePath, jsonData);
};
updateBitvavo();
