import Head from 'next/head';
import { info } from '../../../info';
import Header from './header';
import Footer from './footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getHome, DEFAULT_LOCALE, LOCALES } from '../../../DataAtlas';
import { useLocale } from '../../i18n/ui';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || info.siteUrl || '').replace(/\/$/, '');

/** URL absoluta de una ruta en un idioma dado. El español vive en la raíz. */
const localizedUrl = (path, locale) => {
  const clean = path.split('?')[0].split('#')[0];
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  return `${SITE_URL}${prefix}${clean === '/' ? '' : clean}` || `${SITE_URL}/`;
};

export default function Layout({children}) {
  const router = useRouter();
  const locale = useLocale();
  const [header, setHeader] = useState(true);

  // Título y descripción salen del contenido del idioma activo.
  const {metaTitle, metaDescription} = getHome(locale);
  const title = metaTitle || `${info.companyName} | ${info.description}`;
  const description = metaDescription || info.description;

  const path = router.asPath;

  useEffect(() => {
    setHeader(router.pathname !== '/survey');
  }, [router.pathname]);

  useEffect(() => {
    // Espera a que el DOM actualice antes de medir
    const timeout = setTimeout(() => {
      const mainHeader = document.getElementsByTagName('header')[0];
      if (header && mainHeader) {
        const height = mainHeader.offsetHeight + 'px';
        document.querySelector('html').style.scrollPaddingTop = height;
        document.querySelector('main').style.paddingTop = height;
        document.querySelector('main').style.scrollMarginTop = height;
      } else {
        // Restablecer estilos si no hay header
        document.querySelector('html').style.scrollPaddingTop = '0px';
        document.querySelector('main').style.paddingTop = '0px';
        document.querySelector('main').style.scrollMarginTop = '0px';
      }
    }, 0); // espera al próximo ciclo del event loop

    return () => clearTimeout(timeout);
  }, [router.pathname, header]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}/>

        {/* Le dice a Google que cada página existe en dos idiomas y cuál es cuál. */}
        {SITE_URL && (
          <>
            <link rel="canonical" href={localizedUrl(path, locale)}/>
            {LOCALES.map((code) => (
              <link key={code} rel="alternate" hrefLang={code} href={localizedUrl(path, code)}/>
            ))}
            <link rel="alternate" hrefLang="x-default" href={localizedUrl(path, DEFAULT_LOCALE)}/>
          </>
        )}
      </Head>
      {header && <Header/>}

      <main className={`flex-grow md:pt-[${header}px]`}>{children}</main>

      {header && <Footer/>}
    </>
  );
}
