import { previewIntent, tradeIntentSchema } from "../src/index.ts";

const intent = tradeIntentSchema.parse({
  assetClass: "equity",
  symbol: "AAPL",
  side: "buy",
  quantity: "10",
  orderType: "limit",
  limitPrice: "214.50",
});

const preview = previewIntent(intent);
console.log(JSON.stringify(preview, null, 2));
