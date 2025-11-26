import { z } from "zod";

/**
 * Generic Attribute List validation schemas
 */

// Generic Attribute Schema (single attribute)
export const genericAttributeFunctionalProfileSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(1, "Name cannot be empty"),
});

// Generic Attribute List Schema
export const genericAttributeListFunctionalProfileSchema = z.object({
  genericAttributeListElement: z.array(genericAttributeFunctionalProfileSchema),
});

// Type exports for TypeScript inference
export type GenericAttributeFunctionalProfileInput = z.input<
  typeof genericAttributeFunctionalProfileSchema
>;
export type GenericAttributeListFunctionalProfileInput = z.input<
  typeof genericAttributeListFunctionalProfileSchema
>;
