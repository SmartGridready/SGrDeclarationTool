/**
 * Data Point types for SmartGridReady specifications
 * Äquivalent to DataPoint.xsd
 */

import {
  DataDirectionProduct,
  DataTypeProduct,
  Units,
  DynamicParameterDescriptionList,
  AlternativeNames,
  LegibleDescription,
  GenericAttributeListProduct,
} from "@/models/generic/base-types";

export interface DataPointBase {
  dataPoint: DataPointDescription;
  genericAttributeList?: GenericAttributeListProduct;
}

export interface DataPointDescription {
  dataPointName: string;
  dataDirection: DataDirectionProduct;
  dataType: DataTypeProduct;
  value?: string;
  unit: Units;
  arrayLength?: number;
  minimumValue?: number;
  maximumValue?: number;
  unitConversionMultiplicator?: number;
  parameterList?: DynamicParameterDescriptionList;
  alternativeNames?: AlternativeNames;
  legibleDescription?: LegibleDescription[]; // maxOccurs="4"
  programmerHints?: LegibleDescription[];
}
