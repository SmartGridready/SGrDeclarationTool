import { FunctionalProfileFrame, DeviceFrame } from "@/models";
import {
  ModbusInterface,
  ModbusFunctionalProfile,
  ModbusDataPoint,
} from "@/models/product/modbus-interface";

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
 * Creates a new sample FunctionalProfileFrame with example/default values
 */
export function createSampleFunctionalProfile(): FunctionalProfileFrame {
  return {
    releaseNotes: {
      state: "Draft",
      remarks:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      changeLog: [
        {
          version: "1.0.0",
          date: "2024-01-15",
          author: "example",
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          version: "0.9.0",
          date: "2024-01-14",
          author: "example",
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          version: "0.8.0",
          date: "2024-01-08",
          author: "example",
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
      ],
    },
    functionalProfile: {
      functionalProfileIdentification: {
        specificationOwnerIdentification: "example",
        functionalProfileCategory: "Battery",
        functionalProfileType: "example",
        levelOfOperation: "1",
        versionNumber: {
          primaryVersionNumber: 1,
          secondaryVersionNumber: 0,
          subReleaseVersionNumber: 0,
        },
      },
      alternativeNames: {
        sLV1Name: "example",
        workName: "example",
        manufName: "example",
        iec61850Name: "example",
        sarefName: "example",
        eebusName: "example",
        sunSpecName: "example",
        hpBwpName: "example",
        en17609Name: "example",
      },
      legibleDescription: [
        {
          textElement:
            "This is an example functional profile description in English. It provides a human-readable description of the functional profile's purpose and capabilities.",
          language: "en",
        },
        {
          textElement:
            "Dies ist eine Beispielbeschreibung des Funktionsprofils auf Deutsch. Es bietet eine menschenlesbare Beschreibung des Zwecks und der Fähigkeiten des Funktionsprofils.",
          language: "de",
        },
      ],
    },
    genericAttributeList: {
      genericAttributeListElement: [{ name: "exampleAttribute1" }, { name: "exampleAttribute2" }],
    },
    dataPointList: {
      dataPointListElement: [
        {
          dataPoint: {
            dataPointName: "ExampleDataPoint",
            dataDirection: "R",
            presenceLevel: "M",
            dataType: { float64: {} },
            unit: "KILOWATTS",
            legibleDescription: [
              {
                textElement: "Example data point description",
                language: "en",
              },
            ],
          },
        },
      ],
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
 * Creates a new empty ModbusFunctionalProfile with minimal required values
 */
export function createEmptyModbusFunctionalProfile(): ModbusFunctionalProfile {
  return {
    functionalProfile: {
      functionalProfileName: "",
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
    dataPointList: {
      dataPointListElement: [],
    },
  };
}

/**
 * Creates a new empty ModbusDataPoint with minimal required values
 */
export function createEmptyModbusDataPoint(): ModbusDataPoint {
  return {
    dataPoint: {
      dataPointName: "",
      dataDirection: "R",
      dataType: { float64: {} },
      unit: "NONE",
    },
  };
}
