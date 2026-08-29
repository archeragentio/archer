import { z } from "zod";

const quantity = z.string().regex(/^\d+(\.\d+)?$/, "quantity must be a decimal string");
const price = z.string().regex(/^\d+(\.\d+)?$/, "price must be a decimal string");

const equityIntentSchema = z.object({
  assetClass: z.literal("equity"),
  symbol: z.string().trim().min(1).max(16).transform((value) => value.toUpperCase()),
  side: z.enum(["buy", "sell"]),
  quantity: quantity.optional(),
  notionalUsd: quantity.optional(),
  orderType: z.enum(["market", "limit"]),
  limitPrice: price.optional(),
});

export const tradeIntentSchema = equityIntentSchema.superRefine((value, ctx) => {
  if ((value.quantity === undefined) === (value.notionalUsd === undefined)) {
    ctx.addIssue({ code: "custom", message: "exactly one of quantity or notionalUsd is required" });
  }
  if (value.orderType === "limit" && !value.limitPrice) {
    ctx.addIssue({ code: "custom", path: ["limitPrice"], message: "required for limit orders" });
  }
  if (value.notionalUsd && value.orderType !== "market") {
    ctx.addIssue({
      code: "custom",
      path: ["notionalUsd"],
      message: "dollar-notional orders require market order type",
    });
  }
});

export type TradeIntent = z.infer<typeof tradeIntentSchema>;

export type OrderPreview = {
  status: "awaiting_human";
  symbol: string;
  side: "buy" | "sell";
  quantity: string | null;
  notionalUsd: string | null;
  orderType: "market" | "limit";
  limitPrice: string | null;
  note: string;
};

/** Build an inspectable preview. This package never places or cancels. */
export function previewIntent(input: TradeIntent): OrderPreview {
  const intent = tradeIntentSchema.parse(input);
  return {
    status: "awaiting_human",
    symbol: intent.symbol,
    side: intent.side,
    quantity: intent.quantity ?? null,
    notionalUsd: intent.notionalUsd ?? null,
    orderType: intent.orderType,
    limitPrice: intent.limitPrice ?? null,
    note: "Inspect the terms. A human confirms. The application places once.",
  };
}
