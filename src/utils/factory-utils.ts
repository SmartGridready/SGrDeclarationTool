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
import { ModbusInterface, ModbusFunctionalProfile, ModbusDataPoint } from "@/models/product/modbus-interface";
import { RestApiInterface, RestApiFunctionalProfile, RestApiDataPoint } from "@/models/product/rest-api-interface";
import {
  MessagingFunctionalProfile,
  MessagingDataPoint,
  MessagingInterface,
} from "@/models/product/messaging-interface";
import { ContactInterface, ContactFunctionalProfile } from "@/models/product/contact-interface";
import { GenericInterface, GenericFunctionalProfile } from "@/models/product/generic-interface";
import { DataPointBase } from "@/models/generic";
import {
  MessageBrokerAuthenticationBasic,
  MessageBrokerAuthenticationClientCertificate,
  MessageBrokerAuthentication,
  MessageBrokerAuthenticationType,
  MessageBrokerListElement,
  OutMessage,
  InMessage,
} from "@/models/product/messaging-types";
import { TimeSyncBlockNotification } from "@/models/product/modbus-types";
import { createSimpleDataType } from "@/sections/functional-profile/data-point-list/data-type-utils";

/**
 * Creates an empty ModbusInterface.
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
 * Creates an empty RestApiInterface.
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
 * Creates an empty MessagingInterface.
 */
export function createEmptyMessagingInterface(): MessagingInterface {
  return {
    messagingInterfaceDescription: {
      platform: "MQTT5",
      messageBrokerList: {
        messageBrokerListElement: [],
      },
    },
    functionalProfileList: {
      functionalProfileListElement: [],
    },
  };
}

/**
 * Creates an empty ContactInterface.
 */
export function createEmptyContactInterface(): ContactInterface {
  return {
    contactInterfaceDescription: {
      numberOfContacts: 1,
      contactStabilisationTimeMs: 0,
    },
    functionalProfileList: {
      functionalProfileListElement: [],
    },
  };
}

/**
 * Creates an empty GenericInterface.
 */
export function createEmptyGenericInterface(): GenericInterface {
  return {
    functionalProfileList: {
      functionalProfileListElement: [],
    },
  };
}

/**
 * Creates an empty DeviceFrame.
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
 * Creates an empty FunctionalProfileFrame.
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
 * Creates a base functional profile structure.
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
 * Creates an empty ModbusFunctionalProfile.
 */
export function createEmptyModbusFunctionalProfile(): ModbusFunctionalProfile {
  return createEmptyFunctionalProfileBase() as ModbusFunctionalProfile;
}

/**
 * Creates an empty RestApiFunctionalProfile.
 */
export function createEmptyRestApiFunctionalProfile(): RestApiFunctionalProfile {
  return createEmptyFunctionalProfileBase() as RestApiFunctionalProfile;
}

/**
 * Creates an empty MessagingFunctionalProfile.
 */
export function createEmptyMessagingFunctionalProfile(): MessagingFunctionalProfile {
  return createEmptyFunctionalProfileBase() as MessagingFunctionalProfile;
}

/**
 * Creates an empty ContactFunctionalProfile.
 */
export function createEmptyContactFunctionalProfile(): ContactFunctionalProfile {
  return createEmptyFunctionalProfileBase() as ContactFunctionalProfile;
}

/**
 * Creates an empty GenericFunctionalProfile.
 */
export function createEmptyGenericFunctionalProfile(): GenericFunctionalProfile {
  return createEmptyFunctionalProfileBase() as GenericFunctionalProfile;
}

/**
 * Creates a base data point structure.
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
 * Creates an empty ModbusDataPoint.
 */
export function createEmptyModbusDataPoint(): ModbusDataPoint {
  return createEmptyDataPointBase() as ModbusDataPoint;
}

/**
 * Creates an empty RestApiDataPoint.
 */
export function createEmptyRestApiDataPoint(): RestApiDataPoint {
  return createEmptyDataPointBase() as RestApiDataPoint;
}

/**
 * Creates an empty MessagingDataPoint.
 */
export function createEmptyMessagingDataPoint(): MessagingDataPoint {
  return {
    ...createEmptyDataPointBase(),
    messagingDataPointConfiguration: {
      messagingDataType: { number: {} },
    },
  } as MessagingDataPoint;
}

/**
 * Creates an empty ContactDataPoint.
 */
export function createEmptyContactDataPoint(): DataPointBase {
  return createEmptyDataPointBase() as DataPointBase;
}

/**
 * Creates an empty GenericDataPoint.
 */
export function createEmptyGenericDataPoint(): DataPointBase {
  return createEmptyDataPointBase() as DataPointBase;
}

/**
 * Creates an empty FunctionalProfileDataPoint.
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
 * Creates an empty ChangeLog.
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
 * Creates an empty LegibleDescription.
 */
export function createEmptyLegibleDescription(): LegibleDescription {
  return {
    textElement: "",
    language: "en",
  };
}

/**
 * Creates an empty GenericAttributeFunctionalProfile.
 */
export function createEmptyGenericAttribute(): GenericAttributeFunctionalProfile {
  return {
    name: "",
  };
}

/**
 * Creates an empty JSonElemFunctionalProfile.
 */
export function createEmptyJsonElement(): JSonElemFunctionalProfile {
  return { key: "", string: "" };
}

/**
 * Creates an empty ConfigurationListElement.
 */
export function createEmptyConfigurationListElement(): ConfigurationListElement {
  return {
    name: "",
    dataType: { float64: {} },
  };
}

/**
 * Creates an empty DynamicParameterDescriptionListElement.
 */
export function createEmptyDynamicParameterDescriptionListElement(): DynamicParameterDescriptionListElement {
  return {
    name: "",
    dataType: { float64: {} },
  };
}

/**
 * Creates a base enum entry structure.
 */
function createEmptyEnumEntryBase() {
  return {
    literal: "",
  };
}

/**
 * Creates an empty EnumEntryRecordFunctionalProfile.
 */
export function createEmptyEnumEntryFunctionalProfile(): EnumEntryRecordFunctionalProfile {
  return createEmptyEnumEntryBase();
}

/**
 * Creates an empty BitmapEntryFunctionalProfile.
 */
export function createEmptyBitmapEntryFunctionalProfile(): BitmapEntryFunctionalProfile {
  return {
    literal: "",
  };
}

/**
 * Creates an empty EnumEntryProductRecord.
 */
export function createEmptyEnumEntryProduct(): EnumEntryProductRecord {
  return createEmptyEnumEntryBase();
}

/**
 * Creates an empty EnumEntry with ordinal.
 */
export function createEmptyEnumEntryProductWithOrdinal(): EnumEntry {
  return {
    literal: "",
    ordinal: 0,
  };
}

/**
 * Creates an empty BitmapEntryProduct.
 */
export function createEmptyBitmapEntryProduct(): BitmapEntryProduct {
  return {
    literal: "",
    hexMask: "",
  };
}

/**
 * Creates an empty TimeSyncBlockNotification.
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
 * Creates a base generic attribute structure.
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
 * Creates an empty GenericAttributeProduct.
 */
export function createEmptyGenericAttributeProduct(): GenericAttributeProduct {
  return createEmptyGenericAttributeBase() as GenericAttributeProduct;
}

/**
 * Creates an empty GenericAttributeProductEnd.
 */
export function createEmptyGenericAttributeProductEnd(): GenericAttributeProductEnd {
  return createEmptyGenericAttributeBase();
}

/**
 * Creates an empty MessageBrokerAuthenticationBasic.
 */
export function createEmptyMessageBrokerAuthenticationBasic(): MessageBrokerAuthenticationBasic {
  return {
    username: "",
    password: "",
  };
}

/**
 * Creates an empty MessageBrokerAuthenticationClientCertificate.
 */
export function createEmptyMessageBrokerAuthenticationClientCertificate(): MessageBrokerAuthenticationClientCertificate {
  return {
    keystorePath: "",
    keystorePassword: "",
    truststorePath: "",
    truststorePassword: "",
  };
}

/**
 * Creates an empty MessageBrokerAuthentication based on type.
 * @param authType - The authentication type
 * @returns Authentication object for the specified type
 */
export function createEmptyMessageBrokerAuthentication(
  authType: MessageBrokerAuthenticationType
): MessageBrokerAuthentication {
  if (authType === "basicAuthentication") {
    return {
      basicAuthentication: createEmptyMessageBrokerAuthenticationBasic(),
    };
  } else {
    return {
      clientCertificateAuthentication: createEmptyMessageBrokerAuthenticationClientCertificate(),
    };
  }
}

/**
 * Creates an empty MessageBrokerListElement.
 */
export function createEmptyMessageBrokerListElement(): MessageBrokerListElement {
  return {
    host: "",
    port: "",
  };
}

/**
 * Creates an empty OutMessage.
 */
export function createEmptyOutMessage(): OutMessage {
  return {
    topic: "",
    template: "",
  };
}

/**
 * Creates an empty InMessage.
 */
export function createEmptyInMessage(): InMessage {
  return {
    topic: "",
  };
}
