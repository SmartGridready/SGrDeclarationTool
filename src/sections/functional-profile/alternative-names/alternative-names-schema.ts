import { z } from "zod";

/**
 * Alternative Names validation schemas
 * All fields are optional strings
 */

// Alternative Names Schema
export const alternativeNamesSchema = z.object({
  sLV1Name: z.string().optional(),
  workName: z.string().optional(),
  manufName: z.string().optional(),
  iec61850Name: z.string().optional(),
  sarefName: z.string().optional(),
  eebusName: z.string().optional(),
  sunSpecName: z.string().optional(),
  hpBwpName: z.string().optional(),
  en17609Name: z.string().optional(),
});

// Type exports for TypeScript inference
export type AlternativeNamesInput = z.input<typeof alternativeNamesSchema>;
