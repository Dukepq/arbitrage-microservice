import priceData, { MarketInfo } from "./updatePriceData";
import express from "express";
import { limiter } from "./config/rateLimit";
import cors from "cors";
import envHelper from "./utils/envHelper";
import { z } from "zod";
import { convertMarketInfo } from "./lib/convertMarketInfo";
import { equivalentQuotes } from "./staticData/stablecoinPegs";
import forceStringToNum from "./utils/forceStringToNum";
import authMiddleware from "./middleware/authMiddleware";

const PORT = envHelper("PORT");
const app = express();
app.use(limiter);
app.use(
  cors({
    methods: ["GET"],
  })
);

app.use(authMiddleware);

type FormattedResponse = {
  [key: string]: (MarketInfo & { exchange: string })[];
};

const requestExchangeSchema = z.object({
  params: z.object({
    exchange: z.union([
      z.literal("bitvavo"),
      z.literal("binance"),
      z.literal("kucoin"),
    ]),
  }),
});

app.get("/exchange/:exchange", (req, res) => {
  const result = requestExchangeSchema.safeParse(req);
  if (!result.success) {
    return res.status(400).json({ success: false, message: "Bad request" });
  }
  try {
    const { exchange } = result.data.params;
    const responseObject: FormattedResponse = {};
    const exchangeData = priceData[exchange];
    for (const entry of exchangeData) {
      if (!responseObject[entry.base]) responseObject[entry.base] = [];
      responseObject[entry.base].push({ ...entry, exchange });
    }
    return res.json(responseObject);
  } catch (err) {
    let message = "";
    if (err instanceof Error) {
      message = err.message;
    }
    return res.status(400).json({ success: false, message });
  }
});

const deviatingRequestSchema = z.object({
  query: z.object({
    rate: z.coerce.number(),
    deviation: z.coerce.number(),
    conversion: z.string().regex(new RegExp("^[A-Z]+/[A-Z]+$")),
    exchanges: z
      .string()
      .regex(/\[[^\]]*\]/)
      .optional(),
  }),
});
type DeviatingReturnType = z.infer<typeof deviatingRequestSchema>;

// type DeviatingResponseType = FormattedResponse;
app.get("/deviating", (req, res) => {
  const result = deviatingRequestSchema.safeParse(req);
  if (!result.success) {
    return res.status(400).json({ success: false });
  }
  const data = result.data;
  const deviation = data.query.deviation;
  try {
    const preResObj = convertResponse(data);
    const resObj: any = {};
    for (let entry in preResObj) {
      const marketInfoArray = preResObj[entry as keyof typeof preResObj];
      const bestBids = [];
      for (const entry of marketInfoArray) {
        bestBids.push(forceStringToNum(entry.bid));
      }
      bestBids.sort((a, b) => a - b);
      const med = bestBids[Math.floor(bestBids.length / 2)];
      for (const bestBid of bestBids) {
        const ratio = bestBid / med;
        const dev = 1 - deviation;
        if (ratio < dev) {
          resObj[entry] = preResObj[entry];
        }
      }
    }
    return res.json(resObj);
  } catch (err) {
    let message = "";
    if (err instanceof Error) {
      message = err.message;
    }
    return res.status(400).json({ success: false, message });
  }
});

app.listen(PORT, () => {
  console.log("listening on: " + PORT);
});

function convertResponse(data: DeviatingReturnType) {
  const { exchanges, rate, conversion } = data.query;
  const splitConversion = conversion.split("/");
  const from = splitConversion[0];
  const to = splitConversion[1];
  let exchangeArray: string[] = [];
  if (exchanges) {
    const arr = JSON.parse(exchanges);
    if (Array.isArray(arr)) exchangeArray = arr;
  }
  const fromEquivalents: string[] | undefined = equivalentQuotes[from];
  const toEquivalents: string[] | undefined = equivalentQuotes[to];
  const responseObject: FormattedResponse = {};
  for (const exchange in priceData) {
    if (exchanges && !exchangeArray.includes(exchange)) continue;
    const exchangeData = priceData[exchange as keyof typeof priceData];
    if (!fromEquivalents || !toEquivalents) continue;

    for (let entry of exchangeData) {
      let newEntry = { ...entry };
      const quote = entry.quote;
      if (!responseObject[entry.base]) responseObject[entry.base] = [];
      if (fromEquivalents.includes(quote)) {
        newEntry = convertMarketInfo(entry, rate);
      }
      responseObject[entry.base].push({ ...newEntry, exchange });
    }
  }

  return responseObject;
}
