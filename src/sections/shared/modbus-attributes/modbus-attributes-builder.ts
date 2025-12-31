import { ModbusAttributes } from "@/models/product/modbus-types";
import { buildScalingFactor } from "./scaling-factor/scaling-factor-builder";
import { buildAccessProtection } from "./access-protection/access-protection-builder";
import { wrapInArray, setOptionalXmlField } from "@/utils/builder-utils";
import { validateModbusAttributes } from "./modbus-attributes-schema";

/**
 * Builds XML object for modbusAttributes from ModbusAttributes model
 * @throws Error if required fields are missing
 */
export function buildModbusAttributes(
  modbusAttributes: ModbusAttributes | undefined
): Record<string, unknown> | undefined {
  if (!modbusAttributes) {
    return undefined;
  }

  // Validate using validation layer
  const validation = validateModbusAttributes(modbusAttributes);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for modbus attributes";
    throw new Error(errorMessage);
  }

  const attributesXml: Record<string, unknown> = {};

  // Include optional scalingFactor
  if (modbusAttributes.scalingFactor) {
    attributesXml.scalingFactor = wrapInArray(buildScalingFactor(modbusAttributes.scalingFactor));
  }

  // Include optional numeric fields
  setOptionalXmlField(attributesXml, "stepByIncrement", modbusAttributes.stepByIncrement);
  setOptionalXmlField(attributesXml, "sunssf", modbusAttributes.sunssf);
  setOptionalXmlField(attributesXml, "pollingLatencyMs", modbusAttributes.pollingLatencyMs);

  // Include optional accessProtection
  if (modbusAttributes.accessProtection) {
    attributesXml.accessProtection = wrapInArray(buildAccessProtection(modbusAttributes.accessProtection));
  }

  // Include optional layer6Deviation
  setOptionalXmlField(attributesXml, "layer6Deviation", modbusAttributes.layer6Deviation);

  // Return undefined if no fields were set
  if (Object.keys(attributesXml).length === 0) {
    return undefined;
  }

  return attributesXml;
}
