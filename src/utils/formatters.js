/**
 * Tipo de cambio fijo MXN -> USD.
 * Es el único punto de cambio: los precios en dólares del contenido en inglés
 * se calculan desde aquí, así que ajustar este número actualiza todo el sitio.
 */
export const MXN_TO_USD = 15;

/** Divisa que se muestra en cada idioma. */
export const CURRENCY_BY_LOCALE = {
  es: 'MXN',
  en: 'USD',
};

export function MXNFormatter(int = 0) {
  return int.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  });
}

export function USDFormatter(int = 0) {
  return int.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}

/**
 * Convierte un monto en pesos a dólares con el tipo de cambio fijo.
 * @param {number} mxn
 * @returns {number}
 */
export function mxnToUsd(mxn = 0) {
  return mxn / MXN_TO_USD;
}

/**
 * Monto en pesos ya etiquetado. Ej. 12000 -> "$12,000 MXN"
 * @param {number} amount monto en MXN
 */
export const mxn = (amount = 0) => `${MXNFormatter(amount)} MXN`;

/**
 * Monto en pesos convertido y etiquetado en dólares. Ej. 12000 -> "$800 USD"
 * Se usa dentro del contenido en inglés (src/content/en.js) para que las cifras
 * del copy sigan al tipo de cambio en lugar de quedar escritas a mano.
 * @param {number} amountMXN monto original en MXN
 */
export const usd = (amountMXN = 0) => `${USDFormatter(mxnToUsd(amountMXN))} USD`;

/**
 * Precio en la divisa que corresponde al idioma activo.
 * es -> pesos · en -> dólares
 *
 * @param {number} amountMXN monto en MXN
 * @param {string} [locale]  'es' | 'en'
 * @returns {string} ej. "$1,400 MXN" o "$93 USD"
 */
export function formatPrice(amountMXN, locale = 'es') {
  if (typeof amountMXN !== 'number' || !Number.isFinite(amountMXN)) return '';
  return locale === 'en' ? usd(amountMXN) : mxn(amountMXN);
}

/**
 * Formatea el precio "desde" de un tour en la divisa del idioma activo.
 * `priceFrom` es un número en MXN; `note` es la unidad ya traducida
 * ("p/p", "per person", "por 4 horas", "for 4 hours"...).
 *
 * @param {number} priceFrom monto en MXN
 * @param {string} [note]    sufijo descriptivo opcional, ya localizado
 * @param {string} [locale]  'es' | 'en'
 * @returns {string} ej. "$1,400 MXN p/p" o "$93 USD per person"
 */
export function formatPriceFrom(priceFrom, note = '', locale = 'es') {
  const price = formatPrice(priceFrom, locale);
  if (!price) return '';

  return note ? `${price} ${note}` : price;
}
