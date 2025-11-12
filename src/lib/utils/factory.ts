import { FunctionalProfileFrame } from "@/lib/models";

/**
 * Creates a new empty FunctionalProfileFrame with default/required values
 */
export function createEmptyFunctionalProfile(): FunctionalProfileFrame {
  return {
    releaseNotes: {
      state: "Draft",
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
