// src/pages/_app.js

import '../styles/globals.scss'; // Tu SCSS global existente
import 'swiper/css';

import Layout from '../components/layout/layout';
import { useRouter } from 'next/router';
import { setCookie, getCookie } from 'cookies-next';
import { useEffect } from 'react';

function MyApp({Component, pageProps}) {
  const {isReady, query: {fbclid, utm_source, utm_medium, utm_campaign, utm_content}} = useRouter();

  /* Las cookies se escriben en un efecto, nunca durante el render: en el
     servidor no existe `document` y escribir ahí provoca desajustes de
     hidratación además de ejecutarse dos veces en StrictMode. */
  useEffect(() => {
    if (!isReady) return;

    const expiresIn7Days = () => {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      return date;
    };

    if (!getCookie('_fbc') && fbclid) {
      setCookie('_fbc', `fb.1.${Date.now()}.${fbclid}`, {expires: expiresIn7Days()});
    }

    setCookie(
      'lead_utm',
      {utm_source, utm_medium, utm_campaign, utm_content},
      {expires: expiresIn7Days()},
    );
  }, [isReady, fbclid, utm_source, utm_medium, utm_campaign, utm_content]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
