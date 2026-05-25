export type BrandParts = {
  highlight: string;
  rest: string;
};

export function splitBrandName(siteName: string): BrandParts {
  const safeSiteName = siteName.trim() || 'Steda Roaster';
  const words = safeSiteName.split(/\s+/).filter(Boolean);
  const [highlight = safeSiteName, ...restWords] = words;

  return {
    highlight,
    rest: restWords.join(' '),
  };
}

export function normalizePhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/\D/g, '');
}

export function formatPhoneNumber(phoneNumber: string) {
  const normalizedPhone = normalizePhoneNumber(phoneNumber);

  if (!normalizedPhone) return phoneNumber;

  if (normalizedPhone.startsWith('62') && normalizedPhone.length > 5) {
    const localNumber = normalizedPhone.slice(2);
    const firstGroup = localNumber.slice(0, 3);
    const secondGroup = localNumber.slice(3, 7);
    const remainingGroups = localNumber.slice(7).match(/.{1,4}/g) ?? [];

    return ['+62', firstGroup, secondGroup, ...remainingGroups]
      .filter(Boolean)
      .join(' ');
  }

  return phoneNumber.trim().startsWith('+') ? phoneNumber.trim() : `+${normalizedPhone}`;
}

export function getTelHref(phoneNumber: string) {
  const normalizedPhone = normalizePhoneNumber(phoneNumber);
  return normalizedPhone ? `tel:+${normalizedPhone}` : '#contact';
}

export function getWhatsappHref({
  whatsappNumber,
  whatsappMessage,
}: {
  whatsappNumber: string;
  whatsappMessage: string;
}) {
  const normalizedPhone = normalizePhoneNumber(whatsappNumber);
  const message = encodeURIComponent(whatsappMessage || 'Halo Steda Roaster, saya ingin konsultasi.');

  if (!normalizedPhone) return '#contact';

  return `https://wa.me/${normalizedPhone}?text=${message}`;
}
