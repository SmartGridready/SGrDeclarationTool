import { z } from "zod";

/**
 * Data Type Product validation schemas
 * Note: Full validation of enum/bitmap/json structures would require more complex schemas
 * This provides basic structure validation
 */
export const dataTypeProductSchema = z.union([
  z.object({ boolean: z.object({}) }),
  z.object({ int8: z.object({}) }),
  z.object({ int16: z.object({}) }),
  z.object({ int32: z.object({}) }),
  z.object({ int64: z.object({}) }),
  z.object({ int8U: z.object({}) }),
  z.object({ int16U: z.object({}) }),
  z.object({ int32U: z.object({}) }),
  z.object({ int64U: z.object({}) }),
  z.object({ float32: z.object({}) }),
  z.object({ float64: z.object({}) }),
  z.object({ dateTime: z.object({}) }),
  z.object({ string: z.object({}) }),
  z.object({ enum: z.any() }), // Complex type - validated separately
  z.object({ bitmap: z.any() }), // Complex type - validated separately
  z.object({ json: z.string() }),
]);
