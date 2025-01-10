const { v4: uuidv4 } = require("uuid");

export function generateTrackingId() {
  return uuidv4().replace(/-/g, "").toUpperCase().slice(0, 12);
}
