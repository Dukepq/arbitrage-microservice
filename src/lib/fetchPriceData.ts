import { TickerPrice as TickerPriceBitvavo } from "../types/bitvavoTypes";
import { TickerPrice as TickerPriceBinance } from "../types/binanceTypes";
import { TickerPrice as TickerPriceKucoin } from "../types/kucoinTypes";

export const remainingLimits: { bitvavo: string } = {
  bitvavo: "1000",
};

type BitvavoReturnType = [TickerPriceBitvavo[], null] | [null, Error];

export const fetchBitvavoPrices = async (): Promise<BitvavoReturnType> => {
  const res = await fetch("https://api.bitvavo.com/v2/ticker/book");

  const rl = res.headers.get("Bitvavo-Ratelimit-Remaining");
  if (rl) remainingLimits["bitvavo"] = rl;

  if (!res.ok) {
    const err = new Error(
      "something went wrong while fetching market prices: " +
        res.status +
        "-" +
        res.statusText
    );
    return [null, err];
  }

  const data = await res.json();
  return [data, null];
};

type BinanceReturnType = [TickerPriceBinance[], null] | [null, Error];

export const fetchBinancePrices = async (): Promise<BinanceReturnType> => {
  const res = await fetch("https://www.binance.com/api/v3/ticker/bookTicker");
  if (!res.ok) {
    const err = new Error(
      "something went wrong while fetching market prices: " +
        res.status +
        "-" +
        res.statusText
    );
    return [null, err];
  }
  const data = await res.json();
  return [data, null];
};

type KucoinReturnType = [TickerPriceKucoin[], null] | [null, Error];

export const fetchKucoinPrices = async (): Promise<KucoinReturnType> => {
  const res = await fetch("https://api.kucoin.com/api/v1/market/allTickers");
  if (!res.ok) {
    const err = new Error(
      "something went wrong while fetching market prices: " +
        res.status +
        "-" +
        res.statusText
    );
    return [null, err];
  }
  const data = await res.json();
  return [data.data.ticker, null];
};
