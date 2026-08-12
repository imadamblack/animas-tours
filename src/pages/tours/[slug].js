import TourPage from '../../components/TourPage';
import { getTour, getTours, getTourSlugs } from '../../../DataAtlas';
import { getGalleryImages, getTourVideo } from '../../utils/galleryImages';

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
  return (
    <TourPage tour={tour} tours={tours} gallery={gallery} covers={covers} video={video}/>
  );
}
