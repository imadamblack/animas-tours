/* ===========================================================================
 * DataAtlas — punto único de acceso al contenido del sitio.
 * ---------------------------------------------------------------------------
 * El contenido real vive por idioma en:
 *   src/content/es.js  (español, idioma por defecto)
 *   src/content/en.js  (inglés)
 *
 * Los dos archivos tienen la misma estructura y los mismos `slug`, así que el
 * ruteo i18n de Next sirve la misma URL en ambos idiomas con /en de prefijo.
 *
 * Nada en la app debe importar src/content/* directamente: siempre a través de
 * estas funciones, que resuelven el idioma y hacen fallback a español cuando
 * llega un locale desconocido.
 * ======================================================================== */

import * as es from './src/content/es';
import * as en from './src/content/en';

export const DEFAULT_LOCALE = 'es';
export const LOCALES = ['es', 'en'];

const content = {es, en};

/** Normaliza el locale: cualquier valor desconocido cae en español. */
export const resolveLocale = (locale) => (content[locale] ? locale : DEFAULT_LOCALE);

/** Todo el contenido de un idioma. */
export const getContent = (locale) => content[resolveLocale(locale)];

/** Contenido de la landing principal. */
export const getHome = (locale) => getContent(locale).home;

/** Listado completo de tours. */
export const getTours = (locale) => getContent(locale).tours;

/** Un tour por slug. El slug es el mismo en todos los idiomas. */
export const getTour = (slug, locale) => getTours(locale).find((tour) => tour.slug === slug);

/** Slugs de todos los tours, para generar rutas estáticas. */
export const getTourSlugs = () => es.tours.map(({slug}) => slug);
