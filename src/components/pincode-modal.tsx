"use client";

import React, { useState } from "react";
import { MapPin, Truck, CheckCircle2, AlertCircle, X } from "lucide-react";
import { useUserStore } from "@/lib/store/user-store";
import { lookupPincode, popularPincodes } from "@/lib/data/pincodes";
import { PincodeInfo } from "@/types";

interface PincodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PincodeModal({ isOpen, onClose }: PincodeModalProps) {
  const { currentPincode, setPincode } = useUserStore();
  const [inputVal, setInputVal] = useState(currentPincode);
  const [result, setResult] = useState<PincodeInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCheck = () => {
    setError(null);
    if (!/^\d{6}$/.test(inputVal.trim())) {
      setError("Please enter a valid 6-digit Indian postal PIN code.");
      return;
    }
    const info = lookupPincode(inputVal.trim());
    setResult(info);
    setPincode(info.pincode);
  };

  const handleSelectQuick = (pin: string) => {
    setInputVal(pin);
    const info = lookupPincode(pin);
    setResult(info);
    setPincode(info.pincode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-amber-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-brand-orange/10 text-brand-orange mx-auto flex items-center justify-center mb-3">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 font-heading">Check Delivery Timeline</h3>
          <p className="text-xs text-gray-500 mt-1">
            Enter your 6-digit PIN code to check delivery speed and COD availability.
          </p>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            maxLength={6}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value.replace(/\D/g, ""))}
            placeholder="e.g. 560001 or 600001"
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange font-semibold text-gray-800 text-sm"
          />
          <button
            onClick={handleCheck}
            className="px-5 py-2.5 bg-gradient-to-r from-brand-orange to-brand-pink text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-orange-500/20"
          >
            Check
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="p-4 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
            <div className="flex items-center gap-2 font-bold text-emerald-800 text-sm mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Delivery Available for {result.city}, {result.state}
            </div>
            <div className="text-xs text-emerald-700 space-y-1">
              <p className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" /> Estimated Delivery: <strong>{result.estimatedDays}</strong>
              </p>
              <p>Cash on Delivery (COD) & Instant UPI available</p>
            </div>
          </div>
        )}

        <div className="border-t border-gray-100 pt-4">
          <span className="text-xs font-semibold text-gray-500 block mb-2">Popular Metros:</span>
          <div className="flex flex-wrap gap-1.5">
            {Object.keys(popularPincodes).slice(0, 6).map((pin) => (
              <button
                key={pin}
                onClick={() => handleSelectQuick(pin)}
                className="px-2.5 py-1 text-xs rounded-lg border border-gray-200 hover:border-brand-orange hover:bg-orange-50/50 text-gray-700 font-medium transition-colors"
              >
                {popularPincodes[pin].city} ({pin})
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm rounded-xl transition-colors"
        >
          Confirm Location
        </button>
      </div>
    </div>
  );
}

