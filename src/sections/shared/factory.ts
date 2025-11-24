import { FunctionalProfileFrame } from "@/models";

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
    },
  };
}

/**
 * Creates a new empty FunctionalProfileFrame with minimal required values
 */
export function createEmpty(): FunctionalProfileFrame {
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
      alternativeNames: {},
    },
  };
}
