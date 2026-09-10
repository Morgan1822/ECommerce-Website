import { PincodeInfo } from "@/types";

export const popularPincodes: Record<string, PincodeInfo> = {
  "560001": { pincode: "560001", city: "Bengaluru", state: "Karnataka", estimatedDays: "1-2 Business Days", codAvailable: true, expressDelivery: true },
  "600001": { pincode: "600001", city: "Chennai", state: "Tamil Nadu", estimatedDays: "1-2 Business Days", codAvailable: true, expressDelivery: true },
  "400001": { pincode: "400001", city: "Mumbai", state: "Maharashtra", estimatedDays: "1-2 Business Days", codAvailable: true, expressDelivery: true },
  "110001": { pincode: "110001", city: "New Delhi", state: "Delhi NCR", estimatedDays: "1-2 Business Days", codAvailable: true, expressDelivery: true },
  "500001": { pincode: "500001", city: "Hyderabad", state: "Telangana", estimatedDays: "2-3 Business Days", codAvailable: true, expressDelivery: true },
  "700001": { pincode: "700001", city: "Kolkata", state: "West Bengal", estimatedDays: "2-3 Business Days", codAvailable: true, expressDelivery: true },
  "411001": { pincode: "411001", city: "Pune", state: "Maharashtra", estimatedDays: "1-2 Business Days", codAvailable: true, expressDelivery: true },
  "380001": { pincode: "380001", city: "Ahmedabad", state: "Gujarat", estimatedDays: "2-3 Business Days", codAvailable: true, expressDelivery: true },
  "641001": { pincode: "641001", city: "Coimbatore", state: "Tamil Nadu", estimatedDays: "1-2 Business Days", codAvailable: true, expressDelivery: true },
  "625001": { pincode: "625001", city: "Madurai", state: "Tamil Nadu", estimatedDays: "2-3 Business Days", codAvailable: true, expressDelivery: true },
  "682001": { pincode: "682001", city: "Kochi", state: "Kerala", estimatedDays: "2-4 Business Days", codAvailable: true, expressDelivery: true },
  "302001": { pincode: "302001", city: "Jaipur", state: "Rajasthan", estimatedDays: "2-4 Business Days", codAvailable: true, expressDelivery: true },
};

export function lookupPincode(pincode: string): PincodeInfo {
  const clean = pincode.trim();
  if (popularPincodes[clean]) {
    return popularPincodes[clean];
  }

  // Algorithmic estimation for any valid 6-digit Indian pincode
  const prefix = clean.substring(0, 1);
  let state = "India";
  if (prefix === "1" || prefix === "2") state = "North Region";
  else if (prefix === "3" || prefix === "4") state = "West Region";
  else if (prefix === "5" || prefix === "6") state = "South Region";
  else if (prefix === "7" || prefix === "8") state = "East Region";

  return {
    pincode: clean,
    city: `Pincode ${clean}`,
    state: state,
    estimatedDays: "3-5 Business Days",
    codAvailable: true,
    expressDelivery: false,
  };
}

