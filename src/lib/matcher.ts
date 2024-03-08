import exchangeData from "../exchangeDataLoader";
import { Exchange } from "../config/exchanges";

export function getMarketInfo(market: string, exchange: Exchange) {
  switch (exchange) {
    case "bitvavo":
    //test regex
    case "binance":
    //test regex
  }

  const infoArray = exchangeData[exchange];
  const info = infoArray.find((item) => item.market === market);
  return info;
}
