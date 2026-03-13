export type CountryOption = {
  code: string;
  name: string;
  dialCode: string;
};

export const countries: CountryOption[] = [
  { code: 'IN', name: 'India', dialCode: '+91' },
  { code: 'US', name: 'United States', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971' },
  { code: 'SG', name: 'Singapore', dialCode: '+65' },
  { code: 'AU', name: 'Australia', dialCode: '+61' },
  { code: 'CA', name: 'Canada', dialCode: '+1' },
  { code: 'DE', name: 'Germany', dialCode: '+49' },
  { code: 'FR', name: 'France', dialCode: '+33' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966' },
  { code: 'QA', name: 'Qatar', dialCode: '+974' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27' },
];

export function getDefaultCountry(): CountryOption {
  if (typeof navigator === 'undefined') return countries[0];
  const locale = navigator.language || 'en-IN';
  const parts = locale.split('-');
  const region = (parts[1] || 'IN').toUpperCase();
  return countries.find((country) => country.code === region) || countries[0];
}

export function buildE164(dialCode: string, nationalNumber: string) {
  return `${dialCode}${nationalNumber.replace(/[^\d]/g, '')}`;
}
