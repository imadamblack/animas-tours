// src/pages/_app.js

import '../styles/globals.scss'; // Tu SCSS global existente
import 'swiper/css';

import Layout from '../components/layout/layout';
import { useRouter } from 'next/router';
import { setCookie, getCookie } from 'cookies-next';

function MyApp({Component, pageProps}) {
  const {query: {fbclid, utm_source, utm_medium, utm_campaign, utm_content}} = useRouter();
  const _fbc = getCookie('_fbc');
  const date = new Date();

  if (!_fbc && fbclid) {
    const date = new Date();
    setCookie(
      '_fbc',
      `fb.1.${Date.now()}.${fbclid}`,
      {expires: new Date(date.setDate(date.getDate() + 7))}
    );
  }
  setCookie(
    'lead_utm',
    {utm_source, utm_medium, utm_campaign, utm_content},
    {expires: new Date(date.setDate(date.getDate() + 7))},
  );

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
