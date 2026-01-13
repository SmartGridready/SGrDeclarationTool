import { parseFunctionalProfile } from "@/sections/functional-profile/functional-profile-mapper";
import { validateFunctionalProfileFrame } from "@/sections/functional-profile/functional-profile-schema";
import { buildFunctionalProfileToXml } from "@/sections/functional-profile/functional-profile-builder";
import { fetchFunctionalProfiles, fetchFunctionalProfileXml } from "@/utils/library-api-utils";

describe("Functional Profile Library Conversion and Validation", () => {
  it("should convert and validate all functional profiles from the library", async () => {
    // Get all functional profiles from the API
    const functionalProfiles = await fetchFunctionalProfiles();

    expect(functionalProfiles.length).toBeGreaterThan(0);

    const errors: Array<{ identifier: string; error: string }> = [];

    // Process each functional profile
    for (const profileItem of functionalProfiles) {
      try {
        // Fetch XML from API
        const xmlString = await fetchFunctionalProfileXml(profileItem.identifier);

        // Step 1: Parse XML to FunctionalProfileFrame
        const functionalProfile = await parseFunctionalProfile(xmlString);

        // Step 2: Validate the parsed FunctionalProfileFrame
        const validation = validateFunctionalProfileFrame(functionalProfile);
        if (!validation.success) {
          const firstError = validation.errors?.issues[0];
          const errorMessage = firstError?.message || "Validation failed";
          errors.push({
            identifier: profileItem.identifier,
            error: `Validation failed: ${errorMessage}`,
          });
          continue;
        }

        // Step 3: Build back to XML (this also validates internally)
        await buildFunctionalProfileToXml(functionalProfile);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        errors.push({
          identifier: profileItem.identifier,
          error: `Conversion failed: ${errorMessage}`,
        });
      }
    }

    // If there are any errors, fail the test with detailed information
    if (errors.length > 0) {
      const errorMessages = errors.map((e) => `  - ${e.identifier}: ${e.error}`).join("\n");
      fail(`Failed to convert/validate ${errors.length} functional profile(s):\n${errorMessages}`);
    }

    // Test passes if all conversions and validations succeed
    expect(errors.length).toBe(0);
  });
});
