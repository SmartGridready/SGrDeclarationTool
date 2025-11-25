/**
 * Error messages specific to Legible Description functionality
 */

export const ERROR_MESSAGES = {
  LEGIBLE_DESCRIPTION: {
    MISSING_TEXT_ELEMENT: "LegibleDescription must have a 'textElement' field",
    MISSING_LANGUAGE: "LegibleDescription must have a 'language' field",
    TEXT_ELEMENT_TOO_LONG: "Text element cannot exceed 4000 characters",
    TEXT_ELEMENT_EMPTY: "Text element cannot be empty",
    INVALID_LANGUAGE: "Language must be one of: de, en, fr, it",
    MAX_DESCRIPTIONS_EXCEEDED: "Cannot have more than 4 legible descriptions",
  },
} as const;
