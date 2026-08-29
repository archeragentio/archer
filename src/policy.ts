import { z } from "zod";

export const tradingModeSchema = z.enum(["confirm_all", "autonomous_limited"]);

/** Public policy shape. Confirm-all is the default. The model never receives a place button. */
export const tradingPolicySchema = z.object({
  mode: tradingModeSchema.default("confirm_all"),
  equitiesEnabled: z.boolean().default(true),
  optionsEnabled: z.boolean().default(false),
  cryptoEnabled: z.boolean().default(false),
  maxSingleOrderNotional: z.string().default("2500"),
  maxDailyPlacedNotional: z.string().default("10000"),
  allowMarketOrders: z.boolean().default(true),
  confirmationTtlSeconds: z.number().int().min(60).max(3600).default(180),
});

export type TradingPolicy = z.infer<typeof tradingPolicySchema>;

export const defaultPolicy: TradingPolicy = tradingPolicySchema.parse({});
