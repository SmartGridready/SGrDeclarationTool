import { ModbusAttributes, ModbusLayer6Deviation } from "@/models/product/modbus-types";
import {
  getOptionalNumberValue,
  getOptionalTypedValue,
  getFirstElement,
  setOptionalField,
  Xml2JsObject,
} from "@/utils/mapper-utils";
import { mapScalingFactor } from "./scaling-factor/scaling-factor-mapper";
import { mapAccessProtection } from "./access-protection/access-protection-mapper";

/**
 * Maps XML modbusAttributes to ModbusAttributes model
 */
export function mapModbusAttributes(modbusAttributesXml: Xml2JsObject | undefined): ModbusAttributes | undefined {
  if (!modbusAttributesXml) {
    return undefined;
  }

  const modbusAttributes: ModbusAttributes = {};

  // Map optional scalingFactor
  const scalingFactorXml = getFirstElement(modbusAttributesXml, "scalingFactor");
  setOptionalField(modbusAttributes, "scalingFactor", scalingFactorXml && mapScalingFactor(scalingFactorXml));

  // Map optional stepByIncrement
  setOptionalField(modbusAttributes, "stepByIncrement", getOptionalNumberValue(modbusAttributesXml, "stepByIncrement"));

  // Map optional sunssf
  setOptionalField(modbusAttributes, "sunssf", getOptionalNumberValue(modbusAttributesXml, "sunssf"));

  // Map optional pollingLatencyMs
  setOptionalField(
    modbusAttributes,
    "pollingLatencyMs",
    getOptionalNumberValue(modbusAttributesXml, "pollingLatencyMs")
  );

  // Map optional accessProtection
  const accessProtectionXml = getFirstElement(modbusAttributesXml, "accessProtection");
  setOptionalField(
    modbusAttributes,
    "accessProtection",
    accessProtectionXml && mapAccessProtection(accessProtectionXml)
  );

  // Map optional layer6Deviation
  setOptionalField(
    modbusAttributes,
    "layer6Deviation",
    getOptionalTypedValue<ModbusLayer6Deviation>(modbusAttributesXml, "layer6Deviation")
  );

  // Return undefined if no fields were set
  if (Object.keys(modbusAttributes).length === 0) {
    return undefined;
  }

  return modbusAttributes;
}
