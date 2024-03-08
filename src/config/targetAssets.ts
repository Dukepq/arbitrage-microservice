export const targetAssets = [
  "1INCH",
  "AAVE",
  "ACH",
  "ADA",
  "ADX",
  "AGIX",
  "AGLD",
  "AKRO",
  "ALGO",
  "ALICE",
  "ALPHA",
  "ALT",
  "AMP",
  "ANKR",
  "APE",
  "API3",
  "APT",
  "AR",
  "ARB",
  "ARK",
  "ARPA",
  "ASTR",
  "ATA",
  "ATOM",
  "AUDIO",
  "AVAX",
  "AXL",
  "AXS",
  "BAL",
  "BAND",
  "BAT",
  "BCH",
  "BLUR",
  "BLZ",
  "BNB",
  "BNT",
  "BOND",
  "BONK",
  "BTC",
  "BTT",
  "CAKE",
  "CELO",
  "CELR",
  "CFX",
  "CHR",
  "CHZ",
  "CLV",
  "COMP",
  "COTI",
  "CRO",
  "CRV",
  "CSPR",
  "CTSI",
  "CVC",
  "CVX",
  "CYBER",
  "DAI",
  "DATA",
  "DCR",
  "DENT",
  "DGB",
  "DIA",
  "DNT",
  "DOGE",
  "DOT",
  "DUSK",
  "DYDX",
  "DYM",
  "EDU",
  "EGLD",
  "ELF",
  "ENJ",
  "ENS",
  "EOS",
  "ETC",
  "ETH",
  "EUROC",
  "FET",
  "FIL",
  "FLOKI",
  "FLOW",
  "FORTH",
  "FTM",
  "FTT",
  "FXS",
  "GALA",
  "GAS",
  "GHST",
  "GLM",
  "GLMR",
  "GMT",
  "GMX",
  "GNO",
  "GRT",
  "HBAR",
  "HOT",
  "ICP",
  "ICX",
  "ID",
  "ILV",
  "IMX",
  "INJ",
  "IOST",
  "JASMY",
  "JST",
  "JTO",
  "JUP",
  "KAVA",
  "KLAY",
  "KMD",
  "KNC",
  "KSM",
  "LDO",
  "LINA",
  "LINK",
  "LIT",
  "LOOM",
  "LPT",
  "LRC",
  "LSK",
  "LTC",
  "LTO",
  "LUNA",
  "LUNA2",
  "MAGIC",
  "MANA",
  "MANTA",
  "MASK",
  "MATIC",
  "MEME",
  "MINA",
  "MIOTA",
  "MKR",
  "MLN",
  "MOVR",
  "MTL",
  "NANO",
  "NEAR",
  "NEO",
  "NKN",
  "NMR",
  "NULS",
  "OCEAN",
  "OGN",
  "OMG",
  "ONDO",
  "ONE",
  "ONG",
  "ONT",
  "OP",
  "ORDI",
  "OXT",
  "PEPE",
  "PERP",
  "PHA",
  "POLYX",
  "POND",
  "PORTAL",
  "POWR",
  "PUNDIX",
  "PYTH",
  "QNT",
  "QTUM",
  "RAD",
  "RAY",
  "RDNT",
  "REEF",
  "REN",
  "REQ",
  "RLC",
  "RNDR",
  "ROSE",
  "RPL",
  "RSR",
  "RUNE",
  "RVN",
  "SAND",
  "SEI",
  "SHIB",
  "SKL",
  "SLP",
  "SNT",
  "SNX",
  "SOL",
  "SSV",
  "STEEM",
  "STMX",
  "STORJ",
  "STRAX",
  "STRK",
  "STX",
  "SUI",
  "SUPER",
  "SUSHI",
  "SXP",
  "SYS",
  "T",
  "THETA",
  "TIA",
  "TOMO",
  "TRB",
  "TRX",
  "UMA",
  "UNI",
  "USDC",
  "USDT",
  "UTK",
  "VET",
  "VGX",
  "VTHO",
  "WAVES",
  "WIN",
  "WLD",
  "WOO",
  "XAI",
  "XEM",
  "XLM",
  "XRP",
  "XTZ",
  "XVG",
  "XYO",
  "YFI",
  "YGG",
  "ZETA",
  "ZIL",
  "ZRX",
] as const;

type Assets = (typeof targetAssets)[number];

// const assetDict: Record<Assets, Record<Exchange, string[]>> = {
//   ADA: {
//     binance: ["ADAUSDT", "ADAUSDC"],
//     bitvavo: ["ADA-EUR"],
//     kucoin: ["ADA-USDT"],
//   },
// };
