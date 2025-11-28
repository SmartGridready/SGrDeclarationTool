import { readFileSync } from "fs";
import { join } from "path";

import { buildFunctionalProfileToXml } from "@/sections/functional-profile/functional-profile-builder";
import { parseFunctionalProfile } from "@/sections/functional-profile/functional-profile-mapper";

/**
 * Normalizes XML string by removing indentation and normalizing newlines
 * This allows comparison of XML strings that differ only in formatting
 */
function normalizeXml(xml: string): string {
  // Remove leading/trailing whitespace from each line and filter empty lines
  let normalized = xml
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");

  // Normalize whitespace between tags (but preserve text content)
  normalized = normalized.replace(/>\s+</g, "><");

  // Normalize multiple spaces/tabs/newlines to single space
  // This preserves the structure while normalizing formatting
  normalized = normalized.replace(/\s+/g, " ").trim();

  return normalized;
}

describe("Functional Profile XML", () => {
  it("should accept correct XML and match input with output after normalization", async () => {
    // Read the correct XML sample file
    const xmlFilePath = join(process.cwd(), "public", "samples", "xml", "sample-fp-correct.xml");
    const inputXml = readFileSync(xmlFilePath, "utf-8");

    // Parse the XML to FunctionalProfileFrame model
    const parsedFrame = await parseFunctionalProfile(inputXml);

    // Build the XML back from the model
    const outputXml = await buildFunctionalProfileToXml(parsedFrame);

    // Normalize both XML strings (remove indents and normalize newlines)
    const normalizedInput = normalizeXml(inputXml);
    const normalizedOutput = normalizeXml(outputXml);

    // Compare the normalized XML strings
    expect(normalizedOutput).toBe(normalizedInput);
  });
});
