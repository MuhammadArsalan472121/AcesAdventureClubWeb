// Web3Forms Configuration
// Safely retrieves the key from .env or local secrets.js (both excluded by .gitignore)
let localSecret = "";
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  localSecret = require("./secrets").WEB3FORMS_ACCESS_KEY;
} catch (_) {}

export const WEB3FORMS_ACCESS_KEY =
  (typeof process !== "undefined" && process.env && process.env.EXPO_PUBLIC_WEB3FORMS_KEY) ||
  localSecret ||
  "";
