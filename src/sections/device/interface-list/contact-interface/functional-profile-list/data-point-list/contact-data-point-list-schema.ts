import { z } from "zod";
import { ContactsDataPointList } from "@/models/product/contact-interface";
import { DataPointBase } from "@/models/generic";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { dataPointBaseSchema } from "@/sections/shared/data-point-base/data-point-base-schema";

/**
 * Contact Data Point List validation schemas and validators
 */

// Contact Data Point Schema (uses DataPointBase directly)
export const contactDataPointSchema = dataPointBaseSchema;

// Contact Data Point List Schema
export const contactDataPointListSchema = z.object({
  dataPointListElement: z.array(contactDataPointSchema),
});

// Type exports for TypeScript inference
export type ContactDataPointInput = z.input<typeof contactDataPointSchema>;
export type ContactDataPointListInput = z.input<typeof contactDataPointListSchema>;

// Validators
export function validateContactDataPoint(
  dataPoint: DataPointBase
): ValidationResult<DataPointBase> {
  const result = validateWithSchema(contactDataPointSchema, dataPoint);
  return result as ValidationResult<DataPointBase>;
}

export function validateContactDataPointList(
  dataPointList: ContactsDataPointList
): ValidationResult<ContactsDataPointList> {
  const result = validateWithSchema(contactDataPointListSchema, dataPointList);
  return result as ValidationResult<ContactsDataPointList>;
}
