import { ScalingFactor } from "@/models/generic";
import { wrapInArray } from "@/utils/builder-utils";
import { validateScalingFactor } from "./scaling-factor-schema";

/**
 * Builds XML object for scalingFactor from ScalingFactor model
 * @throws Error if required fields are missing
 */
export function buildScalingFactor(scalingFactor: ScalingFactor): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateScalingFactor(scalingFactor);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for scaling factor";
    throw new Error(errorMessage);
  }
  return {
    multiplicator: wrapInArray(scalingFactor.multiplicator),
    powerof10: wrapInArray(scalingFactor.powerof10),
  };
}
