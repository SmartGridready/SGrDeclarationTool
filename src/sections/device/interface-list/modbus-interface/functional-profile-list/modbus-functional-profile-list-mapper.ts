import {
  ModbusFunctionalProfileList,
  ModbusFunctionalProfile,
} from "@/models/product/modbus-interface";
import { getFirstElement, mapArray, Xml2JsObject } from "@/utils/mapper-utils";
import { mapFunctionalProfileBase } from "@/sections/shared/functional-profile-base/functional-profile-base-mapper";
import { mapModbusAttributes } from "@/sections/shared/modbus-attributes/modbus-attributes-mapper";
import { mapModbusDataPointList } from "./data-point-list/modbus-data-point-list-mapper";
import { setOptionalField } from "@/utils/mapper-utils";

/**
 * Maps XML functionalProfileList to ModbusFunctionalProfileList model
 */
export function mapModbusFunctionalProfileList(
  functionalProfileListXml: Xml2JsObject | undefined
): ModbusFunctionalProfileList {
  if (!functionalProfileListXml) {
    throw new Error("functionalProfileList is required");
  }

  return {
    functionalProfileListElement: mapArray(
      functionalProfileListXml,
      "functionalProfileListElement",
      mapModbusFunctionalProfile,
      []
    ),
  };
}

/**
 * Maps XML functionalProfileListElement to ModbusFunctionalProfile model
 */
function mapModbusFunctionalProfile(elementXml: Xml2JsObject): ModbusFunctionalProfile {
  // Map the base functional profile (functionalProfile and optional genericAttributeList)
  const functionalProfileBase = mapFunctionalProfileBase(elementXml);

  // Map required dataPointList
  const dataPointListXml = getFirstElement(elementXml, "dataPointList");
  if (!dataPointListXml) {
    throw new Error("dataPointList is required in functionalProfileListElement");
  }

  const modbusFunctionalProfile: ModbusFunctionalProfile = {
    ...functionalProfileBase,
    dataPointList: mapModbusDataPointList(dataPointListXml),
  };

  // Map optional modbusAttributes
  const modbusAttributesXml = getFirstElement(elementXml, "modbusAttributes");
  setOptionalField(
    modbusFunctionalProfile,
    "modbusAttributes",
    modbusAttributesXml && mapModbusAttributes(modbusAttributesXml)
  );

  return modbusFunctionalProfile;
}
