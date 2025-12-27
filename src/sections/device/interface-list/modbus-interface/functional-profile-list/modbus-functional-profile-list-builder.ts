import {
  ModbusFunctionalProfileList,
  ModbusFunctionalProfile,
} from "@/models/product/modbus-interface";
import { buildFunctionalProfileBase } from "@/sections/shared/functional-profile-base/functional-profile-base-builder";
import { buildModbusAttributes } from "@/sections/shared/modbus-attributes/modbus-attributes-builder";
import { buildModbusDataPointList } from "./data-point-list/modbus-data-point-list-builder";
import { wrapInArray } from "@/utils/builder-utils";

/**
 * Builds XML object for functionalProfileList from ModbusFunctionalProfileList model
 */
export function buildModbusFunctionalProfileList(
  functionalProfileList: ModbusFunctionalProfileList
): Record<string, unknown> {
  const listXml: Record<string, unknown> = {
    functionalProfileListElement: functionalProfileList.functionalProfileListElement.map(
      (functionalProfile) => buildModbusFunctionalProfile(functionalProfile)
    ),
  };

  return listXml;
}

/**
 * Builds XML object for functionalProfileListElement from ModbusFunctionalProfile model
 */
function buildModbusFunctionalProfile(
  functionalProfile: ModbusFunctionalProfile
): Record<string, unknown> {
  // Start with the base functional profile structure
  const functionalProfileBaseXml = buildFunctionalProfileBase(functionalProfile);
  const functionalProfileXml = functionalProfileBaseXml;

  // Add required dataPointList
  functionalProfileXml.dataPointList = wrapInArray(
    buildModbusDataPointList(functionalProfile.dataPointList)
  );

  // Include optional modbusAttributes
  if (functionalProfile.modbusAttributes) {
    const modbusAttributesXml = buildModbusAttributes(functionalProfile.modbusAttributes);
    if (modbusAttributesXml) {
      functionalProfileXml.modbusAttributes = wrapInArray(modbusAttributesXml);
    }
  }

  return functionalProfileXml;
}
