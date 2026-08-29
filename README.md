# Archer

Public types, examples, and docs for [Archer Agent](https://archeragent.ai).

Archer turns a market question into an inspectable order preview. Policy checks it. A human confirms. The application places once.

This repository is the **public surface**.

- Intent schemas
- Policy defaults (`confirm-all`)
- A preview example that never places

The production agent, brokerage connection, placement, and reconciliation stay private.

```
Ask → intent → policy → preview → human confirm → one placement
```

## Use it

```ts
import { previewIntent, tradeIntentSchema } from "@archeragentio/archer";

const intent = tradeIntentSchema.parse({
  assetClass: "equity",
  symbol: "AAPL",
  side: "buy",
  quantity: "10",
  orderType: "limit",
  limitPrice: "214.50",
});

const preview = previewIntent(intent);
// preview.status === "awaiting_human"
```

```bash
pnpm example:preview
```

## What is not here

- No brokerage credentials
- No raw place / cancel tools
- No autonomous execution path
- No private application source

Live product: [archeragent.ai](https://archeragent.ai)  
App: [app.archeragent.ai](https://app.archeragent.ai)  
Docs: [archeragent.ai/docs](https://archeragent.ai/docs)

## License

MIT
