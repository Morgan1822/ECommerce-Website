import { PincodeInfo } from "@/types";

export const popularPincodes: Record<string, PincodeInfo> = {
  "600053": { pincode: "600053", city: "Ambattur (Chennai Hub)", state: "Tamil Nadu", estimatedDays: "⚡ Same Day / 24-Hr Express", codAvailable: true, expressDelivery: true },
  "600001": { pincode: "600001", city: "Chennai Central", state: "Tamil Nadu", estimatedDays: "⚡ 24-Hr Express Delivery", codAvailable: true, expressDelivery: true },
  "600058": { pincode: "600058", city: "Ambattur Industrial Estate", state: "Tamil Nadu", estimatedDays: "⚡ Same Day Delivery", codAvailable: true, expressDelivery: true },
  "600040": { pincode: "600040", city: "Anna Nagar, Chennai", state: "Tamil Nadu", estimatedDays: "⚡ 24-Hr Express Delivery", codAvailable: true, expressDelivery: true },
  "560001": { pincode: "560001", city: "Bengaluru", state: "Karnataka", estimatedDays: "1-2 Business Days", codAvailable: true, expressDelivery: true },
  "641001": { pincode: "641001", city: "Coimbatore", state: "Tamil Nadu", estimatedDays: "1-2 Business Days", codAvailable: true, expressDelivery: true },
  "625001": { pincode: "625001", city: "Madurai", state: "Tamil Nadu", estimatedDays: "1-2 Business Days", codAvailable: true, expressDelivery: true },
  "682001": { pincode: "682001", city: "Kochi", state: "Kerala", estimatedDays: "2-3 Business Days", codAvailable: true, expressDelivery: true },
  "500001": { pincode: "500001", city: "Hyderabad", state: "Telangana", estimatedDays: "2-3 Business Days", codAvailable: true, expressDelivery: true },
  "400001": { pincode: "400001", city: "Mumbai", state: "Maharashtra", estimatedDays: "2-3 Business Days", codAvailable: true, expressDelivery: true },
  "110001": { pincode: "110001", city: "New Delhi", state: "Delhi NCR", estimatedDays: "2-4 Business Days", codAvailable: true, expressDelivery: true },
  "700001": { pincode: "700001", city: "Kolkata", state: "West Bengal", estimatedDays: "3-4 Business Days", codAvailable: true, expressDelivery: true },
};

export function lookupPincode(pincode: string): PincodeInfo {
  const clean = pincode.trim();
  if (popularPincodes[clean]) {
    return popularPincodes[clean];
  }

  // Tamil Nadu pincodes starting with 60 to 64
  if (clean.startsWith("60") || clean.startsWith("61") || clean.startsWith("62") || clean.startsWith("63") || clean.startsWith("64")) {
    return {
      pincode: clean,
      city: `Tamil Nadu (${clean})`,
      state: "Tamil Nadu",
      estimatedDays: "1-2 Days (Direct from Ambattur Hub)",
      codAvailable: true,
      expressDelivery: true,
    };
  }

  return {
    pincode: clean,
    city: `Pincode ${clean}`,
    state: "Pan-India",
    estimatedDays: "3-5 Business Days",
    codAvailable: true,
    expressDelivery: false,
  };
}
