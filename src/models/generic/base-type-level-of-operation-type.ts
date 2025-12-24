/**
 * Level of Operation types
 * Äquivalent to BaseType_LevelOfOperationType.xsd
 */

export const LEVEL_OF_OPERATION_VALUES = [
  "m",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "1m",
  "2m",
  "3m",
  "4m",
  "5m",
  "6m",
] as const;
export type LevelOfOperation = (typeof LEVEL_OF_OPERATION_VALUES)[number];
