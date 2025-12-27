import { ScalingFactor } from "@/models/generic";
import { getNumberValue, Xml2JsObject } from "@/utils/mapper-utils";

/**
 * Maps XML scalingFactor to ScalingFactor model
 */
export function mapScalingFactor(scalingFactorXml: Xml2JsObject | undefined): ScalingFactor {
  if (!scalingFactorXml) {
    throw new Error("scalingFactor is required");
  }

  return {
    multiplicator: getNumberValue(scalingFactorXml, "multiplicator", 0),
    powerof10: getNumberValue(scalingFactorXml, "powerof10", 0),
  };
}
