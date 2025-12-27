import { ScalingFactor } from "@/models/generic";
import { wrapInArray } from "@/utils/builder-utils";

/**
 * Builds XML object for scalingFactor from ScalingFactor model
 */
export function buildScalingFactor(scalingFactor: ScalingFactor): Record<string, unknown> {
  return {
    multiplicator: wrapInArray(scalingFactor.multiplicator),
    powerof10: wrapInArray(scalingFactor.powerof10),
  };
}
