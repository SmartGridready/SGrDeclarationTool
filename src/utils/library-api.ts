/**
 * Library API utilities for fetching functional profiles and devices from the library
 */

export interface LibraryItem {
  identifier: string;
}

/**
 * Fetches all functional profiles from the library
 * @returns Promise resolving to array of functional profiles
 */
export async function fetchFunctionalProfiles(): Promise<LibraryItem[]> {
  try {
    const response = await fetch("https://library.smartgridready.ch/fp", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch functional profiles: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : (data?.items ?? []);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Error fetching functional profiles: ${message}`);
  }
}

/**
 * Fetches all devices from the library
 * @returns Promise resolving to array of devices
 */
export async function fetchDevices(): Promise<LibraryItem[]> {
  try {
    const response = await fetch("https://library.smartgridready.ch/prod", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch devices: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : (data?.items ?? []);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Error fetching devices: ${message}`);
  }
}

/**
 * Fetches XML content for a functional profile by identifier
 * @param identifier - The identifier of the functional profile
 * @returns Promise resolving to XML string
 */
export async function fetchFunctionalProfileXml(identifier: string): Promise<string> {
  // Identifier already includes .xml extension
  const url = `https://library.smartgridready.ch/fpx/${encodeURIComponent(identifier)}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/xml",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch XML: ${response.status}`);
    }

    const text = await response.text();
    if (!text || !text.trim().startsWith("<")) {
      throw new Error("Response is not valid XML");
    }

    return text;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch XML for functional profile ${identifier}: ${message}`);
  }
}

/**
 * Fetches XML content for a device by identifier
 * @param identifier - The identifier of the device
 * @returns Promise resolving to XML string
 */
export async function fetchDeviceXml(identifier: string): Promise<string> {
  // Identifier already includes .xml extension
  const url = `https://library.smartgridready.ch/prodx/${encodeURIComponent(identifier)}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/xml",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch XML: ${response.status}`);
    }

    const text = await response.text();
    if (!text || !text.trim().startsWith("<")) {
      throw new Error("Response is not valid XML");
    }

    return text;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch XML for device ${identifier}: ${message}`);
  }
}
