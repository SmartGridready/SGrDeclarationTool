import { MasterFunctionsSupportedList } from "@/models/product/modbus-types";
import { setOptionalXmlArray } from "@/utils/builder-utils";
import { validateMasterFunctionsSupportedList } from "./master-functions-supported-list-schema";

/**
 * Builds XML object for masterFunctionsSupportedList from MasterFunctionsSupportedList model
 * @throws Error if required fields are missing
 */
export function buildMasterFunctionsSupportedList(
  list: MasterFunctionsSupportedList
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateMasterFunctionsSupportedList(list);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage =
      firstError?.message || "Validation failed for master functions supported list";
    throw new Error(errorMessage);
  }
  const listXml: Record<string, unknown> = {};

  // Add array of masterFunctionsSupported
  setOptionalXmlArray(listXml, "masterFunctionsSupported", list.masterFunctionsSupported);

  return listXml;
}
