/**
 * Tipo de cambio fijo MXN -> USD.
 * Se define aquí para tener un único punto de cambio cuando haya que ajustarlo.
 */
export const MXN_TO_USD = 15;

export function MXNFormatter(int = 0) {
  return int.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  })
}

export function USDFormatter(int = 0) {
  return int.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
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
 * Formatea el precio "desde" de un tour.
 * `priceFrom` es un número en MXN; `note` es la unidad ("p/p", "4 horas", etc.).
 *
 * @param {number} priceFrom  monto en MXN
 * @param {string} [note]     sufijo descriptivo opcional
 * @returns {string} ej. "$1,400 MXN p/p (~$93 USD)"
 */
export function formatPriceFrom(priceFrom, note = '') {
  if (typeof priceFrom !== 'number' || !Number.isFinite(priceFrom)) return '';

  const mxn = `${MXNFormatter(priceFrom)} MXN`;
  const usd = `${USDFormatter(mxnToUsd(priceFrom))} USD`;
  const suffix = note ? ` ${note}` : '';

  return `${mxn} (${usd})${suffix}`;
}
