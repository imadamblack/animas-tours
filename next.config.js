/** @type {import('next').NextConfig} */

const nextConfig = {
  /**
   * Ruteo i18n nativo de Next.
   *
   *   es -> ruta raíz            (/, /tours/madagascar-animas)
   *   en -> prefijo /en          (/en, /en/tours/madagascar-animas)
   *
   * `localeDetection: false` evita que Next redirija automáticamente según el
   * Accept-Language del navegador. Se deja apagado para que las URLs de las
   * campañas lleguen siempre a la versión que se pautó.
   *
   * Ponlo en `true` si quieres que un visitante con navegador en inglés caiga
   * directo en /en y que Next respete la cookie NEXT_LOCALE que guarda el
   * toggle. Es un cambio de una línea, sin tocar nada más.
   */
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    localeDetection: false,
  },
};

module.exports = nextConfig;
