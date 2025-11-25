import { z } from "zod";
import { LANGUAGE_OPTIONS } from "./legible-description-form-options";

/**
 * Legible Description validation schemas
 */

// Extract language values from constants
const LANGUAGE_VALUES = LANGUAGE_OPTIONS.map((option) => option.value) as [
  string,
  ...string[],
];

// Legible Description Schema
export const legibleDescriptionSchema = z.object({
  textElement: z
    .string({ message: "Text element is required" })
    .min(1, "Text element cannot be empty")
    .max(4000, "Text element cannot exceed 4000 characters"),
  language: z.enum(LANGUAGE_VALUES, {
    message: "Language is required",
  }),
  uri: z.string().optional(),
});

// Legible Descriptions Schema (array, maxOccurs="4")
export const legibleDescriptionsSchema = z
  .array(legibleDescriptionSchema)
  .max(4, "Cannot have more than 4 legible descriptions");

// Type exports for TypeScript inference
export type LegibleDescriptionInput = z.input<typeof legibleDescriptionSchema>;
export type LegibleDescriptionsInput = z.input<
  typeof legibleDescriptionsSchema
>;
