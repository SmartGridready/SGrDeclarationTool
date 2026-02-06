/**
 * Centralized info messages for user-facing informational notifications
 * All info messages displayed to users should be defined here
 */

export const INFO_MESSAGES = {
  EDITOR: {
    EMPTY_LOADED: (itemName: string) => `Empty ${itemName} loaded`,
  },
} as const;
