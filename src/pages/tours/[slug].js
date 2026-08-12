import Head from 'next/head';
import TourPage from '../../components/TourPage';
import { getTour, getTours, getTourSlugs } from '../../../DataAtlas';
import { getGalleryImages, getTourVideo } from '../../utils/galleryImages';
import { info } from '../../../info';

// Las etiquetas Open Graph exigen URLs absolutas: las rutas de /public no bastan.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || info.siteUrl || '').replace(/\/$/, '');

const absoluteUrl = (path) => (path && SITE_URL ? `${SITE_URL}${path}` : null);

export function getStaticPaths({locales}) {
  const slugs = getTourSlugs();

  // Los slugs son los mismos en todos los idiomas: se genera una ruta por
  // combinación slug × locale (/tours/x y /en/tours/x).
  return {
    paths: locales.flatMap((locale) => slugs.map((slug) => ({params: {slug}, locale}))),
    fallback: false, // cualquier slug fuera de `tours` responde 404
  };
}

export function getStaticProps({params, locale}) {
  const tour = getTour(params.slug, locale);

  if (!tour) {
    return {notFound: true};
  }

  // Las imágenes se leen del disco en build: nunca se pide un archivo inexistente.
  const gallery = getGalleryImages(params.slug);

  // Video opcional: solo los tours que tengan video.mp4 renderizan la sección.
  const video = getTourVideo(params.slug);

  // Portada y nombre de cada uno de los otros tours para "Otras aventuras".
  const tours = getTours(locale);

  const covers = tours.reduce((acc, {slug}) => {
    const [cover] = getGalleryImages(slug);
    if (cover) acc[slug] = cover;
    return acc;
  }, {});

  return {props: {tour, tours, gallery, covers, video: video || null}};
}

export default function Tour({tour, tours, gallery, covers, video}) {
  /* next/head se queda con la última etiqueta repetida, así que este bloque
     sobrescribe el título y la descripción genéricos que pone Layout. */
  const title = `Animas Tours: ${tour.name}`;
  const description = tour.tagline;
  const [cover] = gallery;
  const image = absoluteUrl(cover);

  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description}/>}
        <meta property="og:title" content={title}/>
        {description && <meta property="og:description" content={description}/>}
        {image && <meta property="og:image" content={image}/>}
      </Head>
      <TourPage tour={tour} tours={tours} gallery={gallery} covers={covers} video={video}/>
    </>
  );
}
