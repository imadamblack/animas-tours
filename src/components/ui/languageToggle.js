import Link from 'next/link';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import { LOCALES, LOCALE_LABELS, useLocale, useT } from '../../i18n/ui';

/**
 * Toggle ES / EN.
 *
 * Cambiar de idioma también cambia la divisa: español muestra pesos, inglés
 * muestra dólares (ver src/utils/formatters.js).
 *
 * Navega con <Link locale> para conservar la ruta actual: si estás en
 * /tours/madagascar-animas, el botón EN te lleva a /en/tours/madagascar-animas.
 *
 * La elección se guarda en la cookie NEXT_LOCALE. Hoy sirve como registro del
 * idioma preferido; para que además haga que un visitante regrese solo a su
 * idioma hay que poner `localeDetection: true` en next.config.js, que es la
 * bandera que hace que Next lea esa cookie.
 */
export default function LanguageToggle({className = ''}) {
  const {asPath} = useRouter();
  const locale = useLocale();
  const t = useT();

  const remember = (next) => {
    setCookie('NEXT_LOCALE', next, {maxAge: 60 * 60 * 24 * 365, path: '/'});
  };

  return (
    <div
      role="group"
      aria-label={t('nav.languageLabel')}
      className={`flex items-center overflow-hidden ${className}`}
    >
      {LOCALES.map((code) => {
        const {short, name, currency} = LOCALE_LABELS[code];
        const isActive = code === locale;

        return (
          <Link key={code} href={asPath} locale={code} passHref scroll={false}>
            <a
              hrefLang={code}
              lang={code}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => remember(code)}
              title={`${name} · ${currency}`}
              className={`-ft-2 px-3 py-2 leading-none font-medium transition-colors ${
                isActive
                  ? 'bg-brand-2 text-white'
                  : 'bg-transparent text-brand-2 hover:bg-gray-100'
              }`}
            >
              {short}
              <span className="hidden md:inline"> · {currency}</span>
            </a>
          </Link>
        );
      })}
    </div>
  );
}
