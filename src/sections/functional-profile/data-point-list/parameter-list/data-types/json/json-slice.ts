// Parameter list JSON data type slice
// Note: JSON support for parameter lists (DataTypeProduct) may be limited
// This slice is created for consistency with the folder structure
// If JSON is not supported for parameter lists, this file can remain minimal

import { SetState } from "@/sections/shared/utils/slice-utils";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ParameterListJsonSlice {
  // Placeholder for future JSON support in parameter lists
  // Currently, DataTypeProduct.json is just a string, not a complex structure
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createParameterListJsonSlice = (_set: SetState): ParameterListJsonSlice => {
  // Placeholder implementation
  // JSON for parameter lists is currently just a string value in DataTypeProduct
  return {};
};
