import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { home, tours } from '../../DataAtlas.js';
import OptInForm from '../components/form/opt-in-form';
import scrollDepth from '../utils/scrollDepth';
import ReviewList from '../components/ReviewList';
import Mapa from '../components/mapa';
import ModalPhotoGallery from '../components/photoModal';
import { getGalleryImages } from '../utils/galleryImages';
import { formatPriceFrom } from '../utils/formatters';

// Cuántas imágenes secundarias caben en el mosaico de escritorio.
const GRID_SLOTS = 4;

const GRID_LAYOUTS = {
  1: 'grid-cols-1 grid-rows-1',
  2: 'grid-cols-1 grid-rows-2',
  3: 'grid-cols-2 grid-rows-2',
  4: 'grid-cols-2 grid-rows-2',
};

export function getStaticProps() {
  // Las imágenes se leen del disco en build: nunca se pide un archivo inexistente.
  const gallery = getGalleryImages(home.slug);

  const covers = tours.reduce((acc, {slug}) => {
    const [cover] = getGalleryImages(slug);
    if (cover) acc[slug] = cover;
    return acc;
  }, {});

  return {props: {gallery, covers}};
}

export default function Home({gallery = [], covers = {}}) {
  const [openPhotoModal, setOpenPhotoModal] = useState(false);

  useEffect(() => {
    scrollDepth({
      values: [25, 50, 75, 100],
      callback: (value) => fbq('trackCustom', `Scroll Depth: ${value}`),
    });
  }, []);

  const {
    slug,
    name,
    headline,
    subheadline,
    description,
    rate,
    stars,
    ratings,
    reviewsSource,
    highlights,
    badges,
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
        <p className="condensed font-bold text-center">🚨 Reserva aquí y aparta tu lugar</p>
      </div>
      <div className="w-full p-8 rounded-2xl shadow-lg bg-white">
        <OptInForm/>
      </div>
    </>
  );

  return (
    <>
      {/*{openPhotoModal && (*/}
      {/*  <ModalPhotoGallery*/}
      {/*    images={gallery}*/}
      {/*    title={name}*/}
      {/*    onClose={() => setOpenPhotoModal(false)}*/}
      {/*  />*/}
      {/*)}*/}

      {/*{hasGallery && (*/}
      {/*  <>*/}
      {/*    <section id="fotos" className="hidden lg:flex flex-col container md:py-12">*/}
      {/*      <div className="relative w-full rounded-3xl overflow-hidden">*/}
      {/*        {hasMoreImages && (*/}
      {/*          <button*/}
      {/*            onClick={() => setOpenPhotoModal(true)}*/}
      {/*            className="-ft-2 absolute bg-white hover:bg-gray-100 hover:text-brand-2 bottom-8 right-8 text-brand-2 shadow-lg border border-brand-2"*/}
      {/*          >Más imágenes*/}
      {/*          </button>*/}
      {/*        )}*/}
      {/*        <div className={`grid gap-4 ${gridImages.length ? 'grid-cols-2' : 'grid-cols-1'}`}>*/}
      {/*          <div className="relative flex bg-gray-100 shadow pt-[100%]">*/}
      {/*            <div onClick={() => setOpenPhotoModal(true)}*/}
      {/*                 className="absolute inset-0 flex cursor-pointer overflow-hidden">*/}
      {/*              <Image src={heroImage} layout="fill" alt={name} priority*/}
      {/*                     className="object-cover object-center"/>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*          {gridImages.length > 0 && (*/}
      {/*            <div className={`grid gap-4 ${gridLayout}`}>*/}
      {/*              {gridImages.map((src, idx) => (*/}
      {/*                <div key={src} onClick={() => setOpenPhotoModal(true)}*/}
      {/*                     className="relative flex bg-gray-100 cursor-pointer overflow-hidden">*/}
      {/*                  <Image*/}
      {/*                    src={src}*/}
      {/*                    layout="fill"*/}
      {/*                    loading="lazy"*/}
      {/*                    alt={`${name} ${idx + 1}`}*/}
      {/*                    className="object-cover object-center"*/}
      {/*                  />*/}
      {/*                </div>*/}
      {/*              ))}*/}
      {/*            </div>*/}
      {/*          )}*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </section>*/}

      {/*    <section className="lg:hidden">*/}
      {/*      <div className="relative flex h-[50vh] w-full overflow-x-scroll snap-x snap-mandatory">*/}
      {/*        <div className="w-max relative flex">*/}
      {/*          {gallery.map((src, idx) => (*/}
      {/*            <div key={src} className="relative w-[90vw] h-[50vh] flex cursor-pointer snap-center">*/}
      {/*              {idx === 0 ? (*/}
      {/*                <Image src={src} layout="fill" alt={name} priority*/}
      {/*                       className="object-cover object-center"/>*/}
      {/*              ) : (*/}
      {/*                <Image*/}
      {/*                  src={src}*/}
      {/*                  layout="fill"*/}
      {/*                  loading="lazy"*/}
      {/*                  alt={`${name} ${idx}`}*/}
      {/*                  className="object-cover object-center"*/}
      {/*                />*/}
      {/*              )}*/}
      {/*            </div>*/}
      {/*          ))}*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </section>*/}
      {/*  </>*/}
      {/*)}*/}


      <section className="container mt-12 flex gap-8">
        <div className="flex-grow w-full mb-20">
          <div id="tours" className="w-full my-16">
            <h2 className="mb-16">Nuestros tours</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.filter((t) => t.slug !== slug).map((tour) => (
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
                      <p className="font-medium mt-2">{formatPriceFrom(tour.priceFrom, tour.priceNote)}</p>
                      <p className="-ft-1 mt-4 text-brand-1 font-medium">Ver el tour →</p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>

          <div className="container">
            <div id="incluye" className="border-t py-16 w-full">
              <h2 className="mb-16">Todo esto va incluido en cualquier salida.</h2>
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

      {/*<section className="w-full py-8 bg-white shadow-lg border-t sticky bottom-0 lg:bottom-auto top-0 z-[50]">*/}
      {/*  <div className="container flex justify-center lg:justify-between">*/}
      {/*    <div className="hidden lg:flex items-center gap-8">*/}
      {/*      <a href="#fotos" className="ft-0">Fotos</a>*/}
      {/*      <a href="#description" className="ft-0">Nosotros</a>*/}
      {/*      <a href="#tours" className="ft-0">Tours</a>*/}
      {/*      <a href="#incluye" className="ft-0">Incluye</a>*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      className="flex w-full lg:w-1/6 bg-brand-5 rounded-lg border border-green-800 shadow-xl h-[4.2rem] px-8 items-center">*/}
      {/*      <a href="#form" className="-ft-1 w-full text-white text-center font-medium">Reservar mi lugar</a>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {locations.length > 0 && (
        <section id="map" className="container border-t py-20">
          <h2 className="mb-16">
            {locations.length > 1 ? 'Puntos de encuentro' : 'Punto de encuentro'}
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
          <p className="ft-xxl font-bold text-center">{home.rate} ⭐⭐⭐⭐⭐️</p>
          <p className="text-center ft-4">Viajeros que confirman lo que tú estás por vivir</p>
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
