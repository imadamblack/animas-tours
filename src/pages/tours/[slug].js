import TourPage from '../../components/TourPage';
import { tours, getTour } from '../../../DataAtlas';
import { getGalleryImages } from '../../utils/galleryImages';

export function getStaticPaths() {
  return {
    paths: tours.map(({slug}) => ({params: {slug}})),
    fallback: false, // cualquier slug fuera de `tours` responde 404
  };
}

export function getStaticProps({params}) {
  const tour = getTour(params.slug);

  if (!tour) {
    return {notFound: true};
  }

  // Las imágenes se leen del disco en build: nunca se pide un archivo inexistente.
  const gallery = getGalleryImages(params.slug);

  // Portada de cada uno de los otros tours para la sección "Otras aventuras".
  const covers = tours.reduce((acc, {slug}) => {
    const [cover] = getGalleryImages(slug);
    if (cover) acc[slug] = cover;
    return acc;
  }, {});

  return {props: {tour, gallery, covers}};
}

export default function Tour({tour, gallery, covers}) {
  return <TourPage tour={tour} gallery={gallery} covers={covers} />;
}
