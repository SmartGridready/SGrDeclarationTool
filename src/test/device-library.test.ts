import { parseDevice } from "@/sections/device/device-mapper";
import { validateDeviceFrame } from "@/sections/device/device-schema";
import { buildDeviceToXml } from "@/sections/device/device-builder";
import { fetchDevices, fetchDeviceXml } from "@/utils/library-api-utils";

describe("Device Library Conversion and Validation", () => {
  it("should convert and validate all device declarations from the library", async () => {
    // Get all devices from the API
    const devices = await fetchDevices();

    expect(devices.length).toBeGreaterThan(0);

    const errors: Array<{ identifier: string; error: string }> = [];

    // Process each device
    for (const deviceItem of devices) {
      try {
        // Fetch XML from API
        const xmlString = await fetchDeviceXml(deviceItem.identifier);

        // Step 1: Parse XML to DeviceFrame
        const device = await parseDevice(xmlString);

        // Step 2: Validate the parsed DeviceFrame
        const validation = validateDeviceFrame(device);
        if (!validation.success) {
          const firstError = validation.errors?.issues[0];
          const errorMessage = firstError?.message || "Validation failed";
          errors.push({
            identifier: deviceItem.identifier,
            error: `Validation failed: ${errorMessage}`,
          });
          continue;
        }

        // Step 3: Build back to XML (this also validates internally)
        await buildDeviceToXml(device);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        errors.push({
          identifier: deviceItem.identifier,
          error: `Conversion failed: ${errorMessage}`,
        });
      }
    }

    // If there are any errors, fail the test with detailed information
    if (errors.length > 0) {
      const errorMessages = errors.map((e) => `  - ${e.identifier}: ${e.error}`).join("\n");
      fail(`Failed to convert/validate ${errors.length} device declaration(s):\n${errorMessages}`);
    }

    // Test passes if all conversions and validations succeed
    expect(errors.length).toBe(0);
  });
});
