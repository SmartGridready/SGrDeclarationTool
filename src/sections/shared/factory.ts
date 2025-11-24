import { FunctionalProfileFrame } from "@/models";

/**
 * Creates a new sample FunctionalProfileFrame with example/default values
 */
export function createSampleFunctionalProfile(): FunctionalProfileFrame {
  return {
    releaseNotes: {
      state: "Draft",
      remarks:
        "This is a sample functional profile demonstrating the Smart Grid Ready declaration structure. It includes comprehensive identification data and release notes for testing and development purposes.",
      changeLog: [
        {
          version: "1.0.0",
          date: "2024-01-15",
          author: "Development Team",
          comment:
            "Initial release - Sample functional profile created for testing",
        },
        {
          version: "0.9.0",
          date: "2024-01-14",
          author: "QA Team",
          comment: "Beta version - Pre-release testing and validation",
        },
        {
          version: "0.8.0",
          date: "2024-01-08",
          author: "Development Team",
          comment:
            "Alpha version - Initial implementation and structure definition",
        },
      ],
    },
    functionalProfile: {
      functionalProfileIdentification: {
        specificationOwnerIdentification: "SGR-Example-2024",
        functionalProfileCategory: "Battery",
        functionalProfileType: "Lithium-Ion Battery System",
        levelOfOperation: "1",
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
