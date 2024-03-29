import { Exchange } from "./config/exchanges";
import {
  fetchBinancePrices,
  fetchBitvavoPrices,
  fetchKucoinPrices,
} from "./lib/fetchPriceData";
import { getMarketInfo } from "./lib/matcher";
import {
  binanceAssetBaseTranslations,
  bitvavoAssetBaseTranslations,
  kucoinAssetBaseTranslations,
} from "./translations/translations";
import {
  binanceAssetBaseOmissions,
  kucoinAssetBaseOmissions,
  bitvavoAssetBaseOmissions,
} from "./translations/omissions";
import { targetAssets } from "./config/targetAssets";
const timer = 3000;

export type MarketInfo = {
  market: string;
  quote: string;
  base: string;
  bid: string;
  ask: string;
  timestamp: number;
};

type PriceData = Record<Exchange, MarketInfo[]>;

const priceData: PriceData = {
  bitvavo: [],
  binance: [],
  kucoin: [],
};

async function updateBitvavoData(): Promise<void> {
  const [data, err] = await fetchBitvavoPrices();
  const now = Date.now();
  if (err) {
    console.error(err.message);
    priceData.bitvavo = [];

    return;
  }
  const refactor: MarketInfo[] = [];
  for (const entry of data) {
    const match = getMarketInfo(entry.market, "bitvavo");
    if (!match) continue;
    const { askSize, bidSize, ...rest } = entry;
    const translatedBase = translate(match.base, bitvavoAssetBaseTranslations);
    if (bitvavoAssetBaseOmissions.includes(translatedBase)) continue;
    if (
      targetAssets.includes(translatedBase as (typeof targetAssets)[number])
    ) {
      refactor.push({
        ...rest,
        base: translatedBase,
        quote: match.quote,
        timestamp: now,
      });
    }
  }

  priceData.bitvavo = refactor;
}

async function updateBinanceData(): Promise<void> {
  const [data, err] = await fetchBinancePrices();
  const now = Date.now();
  if (err) {
    console.error(err.message);
    priceData.binance = [];
    return;
  }
  const refactor: MarketInfo[] = [];
  for (const entry of data) {
    const { askPrice, bidPrice, symbol } = entry;
    const match = getMarketInfo(symbol, "binance");
    if (!match) continue;
    // temp
    if (!["USDT", "USDC", "FDUSD", "USD", "EUR"].includes(match.quote))
      continue;
    // temp
    const translatedBase = translate(match.base, binanceAssetBaseTranslations);
    if (binanceAssetBaseOmissions.includes(translatedBase)) continue;
    if (
      targetAssets.includes(translatedBase as (typeof targetAssets)[number])
    ) {
      refactor.push({
        market: symbol,
        bid: bidPrice,
        ask: askPrice,
        base: translatedBase,
        quote: match.quote,
        timestamp: now,
      });
    }
  }
  priceData.binance = refactor;
}

async function updateKucoinData(): Promise<void> {
  const [data, err] = await fetchKucoinPrices();
  const now = Date.now();
  if (err) {
    console.error(err.message);
    priceData.kucoin = [];
    return;
  }
  const refactor: MarketInfo[] = [];
  for (const entry of data) {
    const { buy, sell, symbol } = entry;
    const match = getMarketInfo(symbol, "kucoin");
    if (!match) continue;
    // temp
    if (!["USDT", "USDC", "FDUSD", "USD", "EUR"].includes(match.quote))
      continue;
    // temp
    const translatedBase = translate(match.base, kucoinAssetBaseTranslations);
    if (kucoinAssetBaseOmissions.includes(translatedBase)) continue;
    if (
      targetAssets.includes(translatedBase as (typeof targetAssets)[number])
    ) {
      refactor.push({
        market: symbol,
        bid: buy,
        ask: sell,
        base: translatedBase,
        quote: match.quote,
        timestamp: now,
      });
    }
  }
  priceData.kucoin = refactor;
}

async function updateData() {
  try {
    const kucoinPromise = updateKucoinData();
    const bitvavoPromise = updateBitvavoData();
    const binancePromise = updateBinanceData();
    await Promise.all([kucoinPromise, bitvavoPromise, binancePromise]);
    setTimeout(updateData, 8000);
  } catch (err) {
    console.error(err);
    setTimeout(updateData, 8000);
  }
}
updateData();

export default priceData;

function translate(target: string, translations: { [key: string]: string }) {
  const translatedTarget = translations[target];
  if (!translatedTarget) return target;
  return translatedTarget;
}
