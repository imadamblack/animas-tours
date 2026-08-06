import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getHome, getTours } from '../../DataAtlas';
import OptInForm from '../components/form/opt-in-form';
import scrollDepth from '../utils/scrollDepth';
import ReviewList from '../components/ReviewList';
import Mapa from '../components/mapa';
import { getGalleryImages } from '../utils/galleryImages';
import { formatPriceFrom } from '../utils/formatters';
import { useLocale, useT } from '../i18n/ui';

// Cuántas imágenes secundarias caben en el mosaico de escritorio.
const GRID_SLOTS = 4;

const GRID_LAYOUTS = {
  1: 'grid-cols-1 grid-rows-1',
  2: 'grid-cols-1 grid-rows-2',
  3: 'grid-cols-2 grid-rows-2',
  4: 'grid-cols-2 grid-rows-2',
};

export function getStaticProps({locale}) {
  // El contenido se resuelve por idioma; las imágenes son las mismas en ambos.
  const home = getHome(locale);
  const tours = getTours(locale);

  // Las imágenes se leen del disco en build: nunca se pide un archivo inexistente.
  const gallery = getGalleryImages(home.slug);

  const covers = tours.reduce((acc, {slug}) => {
    const [cover] = getGalleryImages(slug);
    if (cover) acc[slug] = cover;
    return acc;
  }, {});

  return {props: {home, tours, gallery, covers}};
}

export default function Home({home, tours = [], gallery = [], covers = {}}) {
  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const locale = useLocale();
  const t = useT();

  useEffect(() => {
    scrollDepth({
      values: [25, 50, 75, 100],
      callback: (value) => fbq('trackCustom', `Scroll Depth: ${value}`),
    });
  }, []);

  const {
    slug,
    description,
    rate,
    includes,
    map,
  } = home;

  const locations = Array.isArray(map) ? map : map ? [map] : [];

  const [heroImage, ...secondaryImages] = gallery;
  const gridImages = secondaryImages.slice(0, GRID_SLOTS);
  const gridLayout = GRID_LAYOUTS[gridImages.length] || GRID_LAYOUTS[4];
  const hasGallery = gallery.length > 0;
  const hasMoreImages = gallery.length > gridImages.length + 1;

  const ReservaCard = () => (
    <>
      <div className="w-full mb-8 p-8 rounded-2xl shadow-lg bg-white">
        <p className="condensed font-bold text-center">{t('reserve.homeBanner')}</p>
      </div>
      <div className="w-full p-8 rounded-2xl shadow-lg bg-white">
        <OptInForm/>
      </div>
    </>
  );

  return (
    <>
      <section className="container mt-12 flex gap-8">
        <div className="flex-grow w-full mb-20">
          <div id="tours" className="w-full my-16">
            <h2 className="mb-16">{t('home.toursTitle')}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.filter((tour) => tour.slug !== slug).map((tour) => (
                <Link key={tour.slug} href={`/tours/${tour.slug}`} passHref>
                  <a className="flex w-full flex-col overflow-hidden">
                    <div className="relative w-full aspect-square pt-[66%] bg-gray-100 rounded-2xl overflow-hidden">
                      {covers[tour.slug] && (
                        <Image src={covers[tour.slug]} layout="fill" loading="lazy" alt={tour.name}
                               className="object-cover object-center"/>
                      )}
                    </div>
                    <div className="flex flex-col flex-grow py-4">
                      <p className="font-medium">{tour.name}</p>
                      <p className="-ft-2 mt-2 flex-grow">{tour.tagline}</p>
                      <p className="-ft-2 mt-4">{tour.duration}<br/>{tour.boat}</p>
                      <p className="font-medium mt-2">
                        {formatPriceFrom(tour.priceFrom, tour.priceNote, locale)}
                      </p>
                      <p className="-ft-1 mt-4 text-brand-1 font-medium">{t('home.viewTour')}</p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>

          <div className="container">
            <div id="incluye" className="border-t py-16 w-full">
              <h2 className="mb-16">{t('home.includesTitle')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {includes.map(({key, value}, idx) => (
                  <div key={`inc-${idx}`} className="w-full flex items-center gap-8">
                    <div className="w-1/6">
                      <div className="relative w-2/3 mx-auto pt-[100%]">
                        <Image src={`/icons-svg/${key}.svg`} layout="fill" alt={value}
                               className="object-center object-contain"/>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <p>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

      {locations.length > 0 && (
        <section id="map" className="container border-t py-20">
          <h2 className="mb-16">
            {locations.length > 1 ? t('map.title.many') : t('map.title.one')}
          </h2>
          <div className={`grid grid-cols-1 gap-16 ${locations.length > 1 ? 'lg:grid-cols-2' : ''}`}>
            {locations.map((location, idx) => (
              <Mapa
                key={`map-${idx}`}
                lugar={location.place}
                ciudad={location.city}
                estado={location.state}
                pais={location.country}
                UrlMap={location.url}
                comentario={location.description}
              />
            ))}
          </div>
        </section>
      )}

      <section className="container border-t py-20">
        <div className="md:w-1/3 mx-auto">
          <p className="ft-xxl font-bold text-center">{rate} ⭐⭐⭐⭐⭐️</p>
          <p className="text-center ft-4">{t('home.reviewsTitle')}</p>
        </div>
        <ReviewList/>
      </section>

      <section className="reading-container flex justify-center border-t">
        <div id="description" className="py-16 w-full">
          <div className="ft-0" dangerouslySetInnerHTML={{__html: description}}/>
        </div>
      </section>
    </>
  );
}
