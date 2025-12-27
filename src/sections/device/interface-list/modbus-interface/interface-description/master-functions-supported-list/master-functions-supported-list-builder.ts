import { MasterFunctionsSupportedList } from "@/models/product/modbus-types";
import { setOptionalXmlArray } from "@/utils/builder-utils";

/**
 * Builds XML object for masterFunctionsSupportedList from MasterFunctionsSupportedList model
 */
export function buildMasterFunctionsSupportedList(
  list: MasterFunctionsSupportedList
): Record<string, unknown> {
  const listXml: Record<string, unknown> = {};

  // Add array of masterFunctionsSupported
  setOptionalXmlArray(listXml, "masterFunctionsSupported", list.masterFunctionsSupported);

  return listXml;
}
