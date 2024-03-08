import { MarketInfo } from "../updatePriceData";
import forceStringToNum from "../utils/forceStringToNum";

export function convertMarketInfo(target: MarketInfo, mod: number): MarketInfo {
  const bidNum = forceStringToNum(target.bid) * mod;
  const askNum = forceStringToNum(target.ask) * mod;
  return {
    ...target,
    bid: bidNum.toString(),
    ask: askNum.toString(),
  };
}
