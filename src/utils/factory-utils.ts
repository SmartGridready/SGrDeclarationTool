import {
  FunctionalProfileFrame,
  DeviceFrame,
  FunctionalProfileDataPoint,
  ChangeLog,
  LegibleDescription,
  GenericAttributeFunctionalProfile,
  JSonElemFunctionalProfile,
  ConfigurationListElement,
  DynamicParameterDescriptionListElement,
  EnumEntryRecordFunctionalProfile,
  BitmapEntryFunctionalProfile,
  EnumEntryProductRecord,
  EnumEntry,
  BitmapEntryProduct,
  GenericAttributeProduct,
  GenericAttributeProductEnd,
} from "@/models";
import {
  ModbusInterface,
  ModbusFunctionalProfile,
  ModbusDataPoint,
} from "@/models/product/modbus-interface";
import {
  RestApiInterface,
  RestApiFunctionalProfile,
  RestApiDataPoint,
} from "@/models/product/rest-api-interface";
import { TimeSyncBlockNotification } from "@/models/product/modbus-types";
import { createSimpleDataType } from "@/sections/functional-profile/data-point-list/data-type-utils";

/**
 * Creates an empty ModbusInterface with minimal required values
 */
export function createEmptyModbusInterface(): ModbusInterface {
  return {
    modbusInterfaceDescription: {
      modbusInterfaceSelection: "TCPIP",
      firstRegisterAddressIsOne: false,
      bitOrder: "BigEndian",
    },
    functionalProfileList: {
      functionalProfileListElement: [],
    },
  };
}

/**
 * Creates an empty RestApiInterface with minimal required values
 */
export function createEmptyRestApiInterface(): RestApiInterface {
  return {
    restApiInterfaceDescription: {
      restApiInterfaceSelection: "URI",
      restApiUri: "",
    },
    functionalProfileList: {
      functionalProfileListElement: [],
    },
  };
}

/**
 * Creates a new empty DeviceFrame with minimal required values
 */
export function createEmptyDevice(): DeviceFrame {
  return {
    deviceName: "",
    specificationOwnerIdentification: "0",
    releaseNotes: {
      state: "Draft",
    },
    deviceInformation: {
      deviceCategory: "Generic",
      isLocalControl: false,
    },
    interfaceList: {
      modbusInterface: createEmptyModbusInterface(),
    },
  };
}

/**
 * Creates a new empty FunctionalProfileFrame with minimal required values
 */
export function createEmptyFunctionalProfile(): FunctionalProfileFrame {
  return {
    functionalProfile: {
      functionalProfileIdentification: {
        specificationOwnerIdentification: "",
        functionalProfileCategory: "Battery",
        functionalProfileType: "",
        levelOfOperation: "1",
        versionNumber: {
          primaryVersionNumber: 0,
          secondaryVersionNumber: 0,
          subReleaseVersionNumber: 0,
        },
      },
    },
  };
}

/**
 * Creates a new empty functional profile (Modbus or REST API) with minimal required values
 */
function createEmptyFunctionalProfileBase() {
  return {
    functionalProfile: {
      functionalProfileName: "",
      functionalProfileIdentification: {
        specificationOwnerIdentification: "",
        functionalProfileCategory: "Battery" as const,
        functionalProfileType: "",
        levelOfOperation: "1" as const,
        versionNumber: {
          primaryVersionNumber: 0,
          secondaryVersionNumber: 0,
          subReleaseVersionNumber: 0,
        },
      },
    },
    dataPointList: {
      dataPointListElement: [],
    },
  };
}

/**
 * Creates a new empty ModbusFunctionalProfile with minimal required values
 */
export function createEmptyModbusFunctionalProfile(): ModbusFunctionalProfile {
  return createEmptyFunctionalProfileBase() as ModbusFunctionalProfile;
}

/**
 * Creates a new empty RestApiFunctionalProfile with minimal required values
 */
export function createEmptyRestApiFunctionalProfile(): RestApiFunctionalProfile {
  return createEmptyFunctionalProfileBase() as RestApiFunctionalProfile;
}

/**
 * Creates a new empty data point (Modbus or REST API) with minimal required values
 */
function createEmptyDataPointBase() {
  return {
    dataPoint: {
      dataPointName: "",
      dataDirection: "R" as const,
      dataType: { float64: {} },
      unit: "NONE" as const,
    },
  };
}

/**
 * Creates a new empty ModbusDataPoint with minimal required values
 */
export function createEmptyModbusDataPoint(): ModbusDataPoint {
  return createEmptyDataPointBase() as ModbusDataPoint;
}

/**
 * Creates a new empty RestApiDataPoint with minimal required values
 */
export function createEmptyRestApiDataPoint(): RestApiDataPoint {
  return createEmptyDataPointBase() as RestApiDataPoint;
}

/**
 * Creates a new empty FunctionalProfileDataPoint with minimal required values
 */
export function createEmptyDataPoint(): FunctionalProfileDataPoint {
  return {
    dataPoint: {
      dataPointName: "",
      dataDirection: "R",
      presenceLevel: "M",
      dataType: createSimpleDataType("float64"),
      unit: "NO_UNITS",
    },
  };
}

/**
 * Creates a new empty ChangeLog with minimal required values
 */
export function createEmptyChangeLog(): ChangeLog {
  return {
    version: "",
    date: new Date().toISOString().split("T")[0],
    author: "",
    comment: "",
  };
}

/**
 * Creates a new empty LegibleDescription with minimal required values
 */
export function createEmptyLegibleDescription(): LegibleDescription {
  return {
    textElement: "",
    language: "en",
  };
}

/**
 * Creates a new empty GenericAttributeFunctionalProfile with minimal required values
 */
export function createEmptyGenericAttribute(): GenericAttributeFunctionalProfile {
  return {
    name: "",
  };
}

/**
 * Creates a new empty JSonElemFunctionalProfile with minimal required values
 */
export function createEmptyJsonElement(): JSonElemFunctionalProfile {
  return { key: "", string: "" };
}

/**
 * Creates a new empty ConfigurationListElement with minimal required values
 */
export function createEmptyConfigurationListElement(): ConfigurationListElement {
  return {
    name: "",
    dataType: { float64: {} },
  };
}

/**
 * Creates a new empty DynamicParameterDescriptionListElement with minimal required values
 */
export function createEmptyDynamicParameterDescriptionListElement(): DynamicParameterDescriptionListElement {
  return {
    name: "",
    dataType: { float64: {} },
  };
}

/**
 * Creates a new empty enum entry (Functional Profile or Product) with minimal required values
 */
function createEmptyEnumEntryBase() {
  return {
    literal: "",
  };
}

/**
 * Creates a new empty EnumEntryRecordFunctionalProfile with minimal required values
 */
export function createEmptyEnumEntryFunctionalProfile(): EnumEntryRecordFunctionalProfile {
  return createEmptyEnumEntryBase();
}

/**
 * Creates a new empty BitmapEntryFunctionalProfile with minimal required values
 */
export function createEmptyBitmapEntryFunctionalProfile(): BitmapEntryFunctionalProfile {
  return {
    literal: "",
  };
}

/**
 * Creates a new empty EnumEntryProductRecord with minimal required values
 */
export function createEmptyEnumEntryProduct(): EnumEntryProductRecord {
  return createEmptyEnumEntryBase();
}

/**
 * Creates a new empty EnumEntry with ordinal (for modbus data point configuration)
 */
export function createEmptyEnumEntryProductWithOrdinal(): EnumEntry {
  return {
    literal: "",
    ordinal: 0,
  };
}

/**
 * Creates a new empty BitmapEntryProduct with minimal required values
 */
export function createEmptyBitmapEntryProduct(): BitmapEntryProduct {
  return {
    literal: "",
    hexMask: "",
  };
}

/**
 * Creates a new empty TimeSyncBlockNotification with minimal required values
 */
export function createEmptyTimeSyncBlockNotification(): TimeSyncBlockNotification {
  return {
    blockCacheIdentification: "",
    firstAddress: 0,
    size: 1,
    registerType: "HoldRegister",
    timeToLiveMs: 1000,
  };
}

/**
 * Creates a new empty generic attribute (Product or ProductEnd) with minimal required values
 */
function createEmptyGenericAttributeBase() {
  return {
    name: "",
    dataType: { float64: {} },
    value: "",
    unit: "NO_UNITS" as const,
  };
}

/**
 * Creates a new empty GenericAttributeProduct (simple) with minimal required values
 */
export function createEmptyGenericAttributeProduct(): GenericAttributeProduct {
  return createEmptyGenericAttributeBase() as GenericAttributeProduct;
}

/**
 * Creates a new empty GenericAttributeProductEnd with minimal required values
 */
export function createEmptyGenericAttributeProductEnd(): GenericAttributeProductEnd {
  return createEmptyGenericAttributeBase();
}
