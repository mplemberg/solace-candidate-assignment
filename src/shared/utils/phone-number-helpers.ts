/**
 * Format phone number to a readable format
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  // Check if it's a standard 10-digit US number
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      10
    )}`;
  }
  // Check if it's a US number with country code
  else if (cleaned.length === 11 && cleaned.startsWith("1")) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(
      7,
      11
    )}`;
  }
  // If it's another format, try to format it reasonably
  else if (cleaned.length > 6) {
    // Insert dashes at reasonable points for readability
    const lastFour = cleaned.slice(-4);
    const secondPart = cleaned.slice(-7, -4);
    const firstPart = cleaned.slice(0, -7);

    if (firstPart) {
      return `${firstPart}-${secondPart}-${lastFour}`;
    } else {
      return `${secondPart}-${lastFour}`;
    }
  }

  // Fall back to original if we can't format it
  return phoneNumber;
};
