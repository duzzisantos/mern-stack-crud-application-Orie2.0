export function getBase64Size(str) {
  // Remove any padding characters '='
  let padding = 0;
  if (str.endsWith("==")) {
    padding = 2;
  } else if (str.endsWith("=")) {
    padding = 1;
  }

  // Calculate the length of the Base64 string without padding
  const base64Length = str.length - padding;

  // Each Base64 character represents 6 bits, so calculate the original byte length
  const byteLength = (base64Length * 6) / 8;

  return byteLength;
}
