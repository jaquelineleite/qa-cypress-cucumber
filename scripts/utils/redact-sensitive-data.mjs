const SENSITIVE_FIELDS = new Set([
  "password",
  "passwd",
  "pwd",
  "token",
  "accesstoken",
  "refreshtoken",
  "authorization",
  "apikey",
  "secret",
  "clientsecret",
  "name",
  "firstname",
  "lastname",
  "birthdate",
  "birthmonth",
  "birthyear",
  "address1",
  "address2",
  "zipcode",
  "postalcode",
  "mobilenumber",
  "phone",
  "email",
]);

function normalizeFieldName(fieldName) {
  return String(fieldName)
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

function redactUrl(value) {
  if (!(value.toLowerCase().startsWith("https://") || value.toLowerCase().startsWith("http://"))) return value;

  try {
    const url = new URL(value);

    if (url.username) url.username = "[REDACTED]";
    if (url.password) url.password = "[REDACTED]";

    for (const key of url.searchParams.keys()) {
      if (SENSITIVE_FIELDS.has(normalizeFieldName(key))) {
        url.searchParams.set(key, "[REDACTED]");
      }
    }

    if (url.hash.startsWith("#") && url.hash.includes("=")) {
      const fragment = new URLSearchParams(url.hash.slice(1));
      let changed = false;

      for (const key of fragment.keys()) {
        if (SENSITIVE_FIELDS.has(normalizeFieldName(key))) {
          fragment.set(key, "[REDACTED]");
          changed = true;
        }
      }

      if (changed) url.hash = fragment.toString();
    }

    return url.toString();
  } catch {
    return value;
  }
}

export function redactSensitiveData(value) {
  if (typeof value === "string") {
    return redactUrl(value).replace(/((?:Bearer|Basic)\s+)[A-Za-z0-9._~+/-]+/gi, "$1[REDACTED]");
  }
  if (Array.isArray(value)) {
    return value.map(redactSensitiveData);
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, fieldValue]) => {
        const normalizedKey = normalizeFieldName(key);

        if (SENSITIVE_FIELDS.has(normalizedKey)) {
          return [key, "[REDACTED]"];
        }

        return [key, redactSensitiveData(fieldValue)];
      })
    );
  }

  return value;
}
