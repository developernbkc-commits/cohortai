import React from 'react';
import { countries, getDefaultCountry, buildE164 } from '../lib/countries';

type PhoneInputProps = {
  label?: string;
  dark?: boolean;
  countryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onCountryNameChange?: (value: string) => void;
  namePrefix?: string;
  required?: boolean;
  helperText?: string;
};

export default function PhoneInput({
  label = 'Phone number',
  dark = false,
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
  onCountryNameChange,
  namePrefix = 'phone',
  required = false,
  helperText,
}: PhoneInputProps) {
  React.useEffect(() => {
    if (!countryCode) {
      const fallback = getDefaultCountry();
      onCountryCodeChange(fallback.dialCode);
      onCountryNameChange?.(fallback.name);
    }
  }, [countryCode, onCountryCodeChange, onCountryNameChange]);

  const selectClass = dark
    ? 'w-full rounded-2xl bg-slate-900/70 border border-slate-800/70 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-200/30'
    : 'w-full rounded-2xl bg-white/80 border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100';

  return (
    <div>
      <div className={`text-xs ${dark ? 'text-slate-300' : 'text-slate-500'}`}>{label}</div>
      <div className="mt-2 grid gap-3 sm:grid-cols-[1fr_1.3fr]">
        <div>
          <select
            name={`${namePrefix}Country`}
            value={countryCode}
            onChange={(e) => {
              const selected = countries.find((country) => country.dialCode === e.target.value) || countries[0];
              onCountryCodeChange(selected.dialCode);
              onCountryNameChange?.(selected.name);
            }}
            className={selectClass}
            required={required}
          >
            {countries.map((country) => (
              <option key={`${country.code}-${country.dialCode}`} value={country.dialCode}>
                {country.name} ({country.dialCode})
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            name={`${namePrefix}Number`}
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange(e.target.value)}
            className={selectClass}
            required={required}
            inputMode="tel"
            placeholder="Mobile / WhatsApp number"
          />
        </div>
      </div>
      <input type="hidden" name={namePrefix} value={buildE164(countryCode || getDefaultCountry().dialCode, phoneNumber)} />
      {helperText ? <div className={`mt-2 text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{helperText}</div> : null}
    </div>
  );
}
