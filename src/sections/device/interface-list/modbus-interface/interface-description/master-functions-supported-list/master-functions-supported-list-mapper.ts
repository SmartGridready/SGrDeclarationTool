import {
  MasterFunctionsSupportedList,
  MasterFunctionsSupported,
} from "@/models/product/modbus-types";
import { Xml2JsObject } from "@/utils/mapper-utils";

/**
 * Maps XML masterFunctionsSupportedList to MasterFunctionsSupportedList model
 */
export function mapMasterFunctionsSupportedList(
  listXml: Xml2JsObject | undefined
): MasterFunctionsSupportedList {
  if (!listXml) {
    throw new Error("masterFunctionsSupportedList is required");
  }

  // Handle array of string values (xml2js converts repeated elements to arrays)
  const masterFunctionsSupportedArray = listXml.masterFunctionsSupported;
  const masterFunctionsSupported: MasterFunctionsSupported[] = [];
  if (Array.isArray(masterFunctionsSupportedArray)) {
    for (const item of masterFunctionsSupportedArray) {
      if (typeof item === "string") {
        masterFunctionsSupported.push(item as MasterFunctionsSupported);
      }
    }
  }

  return {
    masterFunctionsSupported,
  };
}
