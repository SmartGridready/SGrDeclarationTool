import { z } from "zod";
import { enumMapProductSchema } from "./enum/enum-schema";
import { bitmapProductSchema } from "./bitmap/bitmap-schema";

/**
 * Data Type Product validation schemas
 * Based on BaseTypes.xsd: DataTypeProduct is a choice of enum, bitmap, json, or primitive types
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
  z.object({ enum: enumMapProductSchema }), // EnumMapProduct: requires at least one enumEntry
  z.object({ bitmap: bitmapProductSchema }), // BitmapProduct: requires at least one bitmapEntry
  z.object({ json: z.literal("") }), // EmptyValue: must be empty string per XSD
]);
