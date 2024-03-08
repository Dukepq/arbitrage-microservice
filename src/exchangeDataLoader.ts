import fs from "fs";
import path from "path";
import { Exchange } from "./config/exchanges";

export type ExchangeInfo = {
  market: string;
  status: string;
  base: string;
  quote: string;
};
type FileArg = "bitvavo.json" | "binance.json" | "kucoin.json";
const loadFiles: FileArg[] = ["bitvavo.json", "binance.json", "kucoin.json"];

const exchangeData: Record<Exchange, ExchangeInfo[]> = {
  bitvavo: [],
  binance: [],
  kucoin: [],
};

const loadData = <T extends FileArg>(file: T): ExchangeInfo[] => {
  try {
    const loc = path.join(__dirname, "..", "exchangeDataStatic", file);
    const res = fs.readFileSync(loc);
    const dataString = res.toString();

    return JSON.parse(dataString);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error loading data from ${file}: ${err.message}`);
    }
    return [];
  }
};

for (let entry of loadFiles) {
  const exchange = entry.split(".")[0] as Exchange;
  let data = loadData(entry);
  exchangeData[exchange] = data;
}

export default exchangeData;
