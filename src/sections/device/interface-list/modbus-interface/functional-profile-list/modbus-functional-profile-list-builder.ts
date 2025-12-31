import { ModbusFunctionalProfileList, ModbusFunctionalProfile } from "@/models/product/modbus-interface";
import { buildFunctionalProfileBase } from "@/sections/shared/functional-profile-base/functional-profile-base-builder";
import { buildModbusAttributes } from "@/sections/shared/modbus-attributes/modbus-attributes-builder";
import { buildModbusDataPointList } from "./data-point-list/modbus-data-point-list-builder";
import { wrapInArray } from "@/utils/builder-utils";
import {
  validateModbusFunctionalProfileList,
  validateModbusFunctionalProfile,
} from "./modbus-functional-profile-list-schema";

/**
 * Builds XML object for functionalProfileList from ModbusFunctionalProfileList model
 * @throws Error if required fields are missing
 */
export function buildModbusFunctionalProfileList(
  functionalProfileList: ModbusFunctionalProfileList
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateModbusFunctionalProfileList(functionalProfileList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for modbus functional profile list";
    throw new Error(errorMessage);
  }
  const listXml: Record<string, unknown> = {
    functionalProfileListElement: functionalProfileList.functionalProfileListElement.map((functionalProfile) =>
      buildModbusFunctionalProfile(functionalProfile)
    ),
  };

  return listXml;
}

/**
 * Builds XML object for functionalProfileListElement from ModbusFunctionalProfile model
 * @throws Error if required fields are missing
 */
function buildModbusFunctionalProfile(functionalProfile: ModbusFunctionalProfile): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateModbusFunctionalProfile(functionalProfile);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for modbus functional profile";
    throw new Error(errorMessage);
  }
  // Start with the base functional profile structure
  const functionalProfileBaseXml = buildFunctionalProfileBase(functionalProfile);
  const functionalProfileXml = functionalProfileBaseXml;

  // Add required dataPointList
  functionalProfileXml.dataPointList = wrapInArray(buildModbusDataPointList(functionalProfile.dataPointList));

  // Include optional modbusAttributes
  if (functionalProfile.modbusAttributes) {
    const modbusAttributesXml = buildModbusAttributes(functionalProfile.modbusAttributes);
    if (modbusAttributesXml) {
      functionalProfileXml.modbusAttributes = wrapInArray(modbusAttributesXml);
    }
  }

  return functionalProfileXml;
}
