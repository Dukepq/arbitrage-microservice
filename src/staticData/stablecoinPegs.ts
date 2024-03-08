const equivalentUSDQuotes = ["USD", "USDT", "USDC", "FDUSD"];
const equivalentEURQuotes = ["EUR", "EURC"];
Object.freeze(equivalentUSDQuotes);
Object.freeze(equivalentEURQuotes);

const equivalentQuotes: {
  [key: string]: string[];
} = {
  USD: equivalentUSDQuotes,
  EUR: equivalentEURQuotes,
};
Object.freeze(equivalentQuotes);

export { equivalentQuotes, equivalentUSDQuotes };
