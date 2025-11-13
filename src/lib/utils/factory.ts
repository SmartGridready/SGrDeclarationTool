import { FunctionalProfileFrame } from "@/lib/models";

/**
 * Creates a new sample FunctionalProfileFrame with example/default values
 */
export function createSampleFunctionalProfile(): FunctionalProfileFrame {
  return {
    releaseNotes: {
      state: "Draft",
      remarks: "test remarks",
      changeLog: [
        {
          version: "1.0.0",
          date: "2024-01-15",
          author: "System",
          comment: "Initial release",
        },
        {
          version: "0.9.0",
          date: "2024-01-14",
          author: "Developer",
          comment: "Beta version",
        },
      ],
    },
    functionalProfile: {
      functionalProfileIdentification: {
        specificationOwnerIdentification: "",
        functionalProfileCategory: "HeatPumpControl",
        functionalProfileType: "",
        levelOfOperation: "m",
        versionNumber: {
          primaryVersionNumber: 1,
          secondaryVersionNumber: 0,
          subReleaseVersionNumber: 0,
        },
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
        functionalProfileCategory: "HeatPumpControl",
        functionalProfileType: "",
        levelOfOperation: "m",
        versionNumber: {
          primaryVersionNumber: 1,
          secondaryVersionNumber: 0,
          subReleaseVersionNumber: 0,
        },
      },
    },
  };
}
