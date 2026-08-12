/* ===========================================================================
 * Diccionario de interfaz (ES / EN)
 * ---------------------------------------------------------------------------
 * Aquí viven SOLO los textos de UI: botones, títulos de sección, labels de
 * formulario, microcopy. El contenido comercial (tours, descripciones,
 * itinerarios) vive en src/content/es.js y src/content/en.js.
 *
 * Uso en componentes:
 *   const t = useT();
 *   <h2>{t('home.toursTitle')}</h2>
 *   <p>{t('tour.reviews', {count: 25})}</p>
 *
 * Uso fuera de React (getStaticProps, helpers):
 *   const t = getT(locale);
 * ======================================================================== */

import { useRouter } from 'next/router';

export const DEFAULT_LOCALE = 'es';
export const LOCALES = ['es', 'en'];

/** Etiqueta que se muestra en el toggle de idioma, con su divisa. */
export const LOCALE_LABELS = {
  es: {short: 'ES', name: 'Español', currency: 'MXN', flag: '🇲🇽'},
  en: {short: 'EN', name: 'English', currency: 'USD', flag: '🇺🇸'},
};

const dictionaries = {
  es: {
    /* --- Header / navegación --- */
    'nav.book': 'Reserva',
    'nav.bookSeat': 'Reservar mi lugar',
    'nav.photos': 'Fotos',
    'nav.description': 'Descripción',
    'nav.itinerary': 'Itinerario',
    'nav.includes': 'Incluye',
    'nav.languageLabel': 'Cambiar idioma',
    'nav.switchTo': 'Ver el sitio en inglés, con precios en dólares',

    /* --- Landing --- */
    'home.toursTitle': 'Nuestras experiencias',
    'home.viewTour': 'Ver el tour →',
    'home.includesTitle': 'Todo esto va incluido en cualquier salida.',
    'home.reviewsTitle': 'Viajeros que confirman lo que tú estás por vivir',

    /* --- Página de tour --- */
    'tour.duration': 'Duración',
    'tour.checkIn': 'Check In',
    'tour.boat': 'Embarcación',
    'tour.reviews': '{count} reseñas',
    'tour.moreImages': 'Más imágenes',
    'tour.readMore': 'Leer más',
    'tour.readLess': 'Leer menos',
    'tour.itineraryTitle': 'Cómo se vive el recorrido',
    'tour.videoPlay': 'Reproducir video',
    'tour.includesTitle': 'Qué incluye',
    'tour.notIncludesTitle': 'No incluye',
    'tour.otherTours': 'Otras aventuras',
    'tour.reviewsTitle': 'Reseñas de viajeros que confirman lo que tú estás por vivir',

    /* --- Mapas --- */
    'map.title.one': 'Punto de encuentro',
    'map.title.many': 'Puntos de encuentro',

    /* --- Tarjeta de reserva --- */
    'reserve.homeBanner': '🚨 Reserva aquí y aparta tu lugar',
    'reserve.tourBanner': '🚨 Pregunta por descuentos de temporada y grupos',

    /* --- Formulario --- */
    'form.date': 'Fecha',
    'form.datePlaceholder': 'Fecha del tour',
    'form.pax': 'Personas',
    'form.paxPlaceholder': 'Personas',
    'form.name': 'Tu nombre',
    'form.phone': 'Teléfono de WhatsApp',
    'form.email': 'Correo electrónico',
    'form.tourQuestion': '¿Qué tour te interesa?',
    'form.submit': 'Reservar →',
    'form.noCharge': 'Aún no se te cobrará nada',

    /* --- DatePicker --- */
    'date.placeholder': 'Selecciona una fecha',
    'date.clear': 'Limpiar',
    'date.clearAria': 'Limpiar fecha',
    'date.dialogAria': 'Elegir fecha',
    'date.prevMonth': 'Mes anterior',
    'date.nextMonth': 'Mes siguiente',
    'date.today': 'Hoy',
    'date.soonest': 'Más próxima',
    'date.unavailable': 'No disponible',

    /* --- Gracias --- */
    'thanks.title': 'Listo, recibimos tu solicitud',
    'thanks.body':
      'Un miembro del equipo de {company} te contactará por WhatsApp para confirmar disponibilidad y cerrar tu reservación.',
    'thanks.whatsappPre': '¿Tienes prisa? Escríbenos por',
    'thanks.whatsapp': 'WhatsApp',

    /* --- Galería --- */
    'gallery.close': 'Cerrar galería',
  },

  en: {
    /* --- Header / navigation --- */
    'nav.book': 'Book now',
    'nav.bookSeat': 'Book my spot',
    'nav.photos': 'Photos',
    'nav.description': 'Description',
    'nav.itinerary': 'Itinerary',
    'nav.includes': 'What’s included',
    'nav.languageLabel': 'Change language',
    'nav.switchTo': 'View the site in Spanish, with prices in pesos',

    /* --- Landing --- */
    'home.toursTitle': 'Our experiences',
    'home.viewTour': 'View tour →',
    'home.includesTitle': 'All of this is included on every departure.',
    'home.reviewsTitle': 'Travelers who confirm what you are about to live',

    /* --- Tour page --- */
    'tour.duration': 'Duration',
    'tour.checkIn': 'Check-in',
    'tour.boat': 'Boat',
    'tour.reviews': '{count} reviews',
    'tour.moreImages': 'More photos',
    'tour.readMore': 'Read more',
    'tour.readLess': 'Read less',
    'tour.itineraryTitle': 'How the day unfolds',
    'tour.videoPlay': 'Play video',
    'tour.includesTitle': 'What’s included',
    'tour.notIncludesTitle': 'Not included',
    'tour.otherTours': 'Other adventures',
    'tour.reviewsTitle': 'Reviews from travelers who confirm what you are about to live',

    /* --- Maps --- */
    'map.title.one': 'Meeting point',
    'map.title.many': 'Meeting points',

    /* --- Booking card --- */
    'reserve.homeBanner': '🚨 Book here and lock in your spot',
    'reserve.tourBanner': '🚨 Ask about seasonal and group discounts',

    /* --- Form --- */
    'form.date': 'Date',
    'form.datePlaceholder': 'Tour date',
    'form.pax': 'People',
    'form.paxPlaceholder': 'People',
    'form.name': 'Your name',
    'form.phone': 'WhatsApp number',
    'form.email': 'Email address',
    'form.tourQuestion': 'Which tour are you interested in?',
    'form.submit': 'Book now →',
    'form.noCharge': 'You will not be charged yet',

    /* --- DatePicker --- */
    'date.placeholder': 'Pick a date',
    'date.clear': 'Clear',
    'date.clearAria': 'Clear date',
    'date.dialogAria': 'Choose a date',
    'date.prevMonth': 'Previous month',
    'date.nextMonth': 'Next month',
    'date.today': 'Today',
    'date.soonest': 'Soonest',
    'date.unavailable': 'Unavailable',

    /* --- Thank you --- */
    'thanks.title': 'Done, we got your request',
    'thanks.body':
      'A member of the {company} team will reach out on WhatsApp to confirm availability and finish your booking.',
    'thanks.whatsappPre': 'In a hurry? Message us on',
    'thanks.whatsapp': 'WhatsApp',

    /* --- Gallery --- */
    'gallery.close': 'Close gallery',
  },
};

/** Normaliza el locale: cualquier valor desconocido cae en español. */
export const resolveLocale = (locale) => (dictionaries[locale] ? locale : DEFAULT_LOCALE);

/**
 * Traductor para un idioma dado.
 * Soporta interpolación simple con llaves: t('tour.reviews', {count: 25})
 *
 * @param {string} locale
 * @returns {(key: string, vars?: object) => string}
 */
export function getT(locale) {
  const dict = dictionaries[resolveLocale(locale)];

  return (key, vars) => {
    const value = dict[key];

    // Una clave faltante se ve en pantalla en vez de romper el render en silencio.
    if (value === undefined) return key;
    if (!vars) return value;

    return Object.keys(vars).reduce(
      (text, name) => text.split(`{${name}}`).join(vars[name]),
      value,
    );
  };
}

/** Idioma activo, ya normalizado. */
export function useLocale() {
  const {locale} = useRouter();
  return resolveLocale(locale);
}

/** Traductor del idioma activo. */
export function useT() {
  return getT(useLocale());
}

/** Divisa que corresponde al idioma activo. */
export function useCurrency() {
  return LOCALE_LABELS[useLocale()].currency;
}
