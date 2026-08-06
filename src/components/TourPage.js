import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import OptInForm from './form/opt-in-form';
import scrollDepth from '../utils/scrollDepth';
import ReviewList from './ReviewList';
import Mapa from './mapa';
import ModalPhotoGallery from './photoModal';
import { formatPriceFrom } from '../utils/formatters';
import { useLocale, useT } from '../i18n/ui';

// Cuántas imágenes secundarias caben en el mosaico de escritorio.
const GRID_SLOTS = 4;

// Clases del mosaico según cuántas imágenes secundarias existan realmente.
const GRID_LAYOUTS = {
  1: 'grid-cols-1 grid-rows-1',
  2: 'grid-cols-1 grid-rows-2',
  3: 'grid-cols-2 grid-rows-2',
  4: 'grid-cols-2 grid-rows-2',
};

/**
 * Plantilla de página de detalle de tour.
 * Las páginas se generan desde la ruta dinámica /src/pages/tours/[slug].js,
 * que resuelve el contenido del idioma activo desde DataAtlas.js.
 *
 * @param {object}   tour     contenido del tour, ya en el idioma de la página
 * @param {object[]} tours    todos los tours del mismo idioma, para "Otras aventuras"
 * @param {string[]} gallery  rutas reales de /public/imgSlider/<slug>, leídas en build
 * @param {object}   covers   mapa slug -> portada
 */
export default function TourPage({tour, tours = [], gallery = [], covers = {}}) {
  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const locale = useLocale();
  const t = useT();

  useEffect(() => {
    scrollDepth({
      values: [25, 50, 75, 100],
      callback: (value) => fbq('trackCustom', `Scroll Depth: ${value}`),
    });
  }, []);

  if (!tour) return null;

  const {
    slug,
    name,
    tagline,
    duration,
    schedule,
    boat,
    priceFrom,
    priceNote,
    rate,
    stars,
    ratings,
    description,
    includes,
    notIncludes,
    itinerary,
    map,
  } = tour;

  // `map` es un arreglo de ubicaciones. Se acepta un objeto suelto por compatibilidad.
  const locations = Array.isArray(map) ? map : map ? [map] : [];

  // La galería viene del disco, así que la cantidad se ajusta sola a cada tour.
  const [heroImage, ...secondaryImages] = gallery;
  const gridImages = secondaryImages.slice(0, GRID_SLOTS);
  const gridLayout = GRID_LAYOUTS[gridImages.length] || GRID_LAYOUTS[4];
  const hasGallery = gallery.length > 0;
  const hasMoreImages = gallery.length > gridImages.length + 1;

  const ReservaCard = () => (
    <>
      <div className="w-full mb-8 p-8 rounded-2xl shadow-lg bg-white border">
        <p className="condensed font-bold text-center">{t('reserve.tourBanner')}</p>
      </div>
      <div className="w-full p-8 rounded-2xl shadow-lg bg-white border">
        <div className="border-b border-gray-200 mb-8">
          <p className="ft-3 font-medium mb-8">{formatPriceFrom(priceFrom, priceNote, locale)}</p>
        </div>
        <OptInForm tour={slug} />
      </div>
    </>
  );

  return (
    <>
      {openPhotoModal && (
        <ModalPhotoGallery
          images={gallery}
          title={name}
          onClose={() => setOpenPhotoModal(false)}
        />
      )}

      {hasGallery && (
        <>
          <section id="fotos" className="hidden lg:flex flex-col container md:py-12">
            <div className="relative w-full rounded-3xl overflow-hidden">
              {hasMoreImages && (
                <button
                  onClick={() => setOpenPhotoModal(true)}
                  className="-ft-2 absolute bg-white hover:bg-gray-100 hover:text-brand-2 bottom-8 right-8 text-brand-2 shadow-lg border border-brand-2"
                >{t('tour.moreImages')}
                </button>
              )}
              <div className={`grid gap-4 ${gridImages.length ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <div className="relative flex bg-gray-100 shadow pt-[100%]">
                  <div onClick={() => setOpenPhotoModal(true)}
                       className="absolute inset-0 flex cursor-pointer overflow-hidden">
                    <Image src={heroImage} layout="fill" alt={name} priority
                           className="object-cover object-center"/>
                  </div>
                </div>
                {gridImages.length > 0 && (
                  <div className={`grid gap-4 ${gridLayout}`}>
                    {gridImages.map((src, idx) => (
                      <div key={src} onClick={() => setOpenPhotoModal(true)}
                           className="relative flex bg-gray-100 cursor-pointer overflow-hidden">
                        <Image
                          src={src}
                          layout="fill"
                          loading="lazy"
                          alt={`${name} ${idx + 1}`}
                          className="object-cover object-center"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="lg:hidden">
            <div className="relative flex h-[50vh] w-full overflow-x-scroll snap-x snap-mandatory">
              <div className="w-max relative flex">
                {gallery.map((src, idx) => (
                  <div key={src} className="relative w-[90vw] h-[50vh] flex cursor-pointer snap-center">
                    {idx === 0 ? (
                      <Image src={src} layout="fill" alt={name} priority
                             className="object-cover object-center"/>
                    ) : (
                      <Image
                        src={src}
                        layout="fill"
                        loading="lazy"
                        alt={`${name} ${idx}`}
                        className="object-cover object-center"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <section className="container mt-12 lg:mt-0 flex gap-8">
        <div className="flex-grow w-full lg:w-2/3 mb-20">
          <div className="max-w-[72rem]">
            <h2 className="mt-4">{name}</h2>
            <p className="mt-4">{tagline}</p>
            <p className="mt-4">
              {rate} <span className="text-yellow-400">{stars}</span> | {t('tour.reviews', {count: ratings})}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border rounded-3xl mt-12 p-8">
              <div>
                <p className="-ft-2 uppercase font-medium">{t('tour.duration')}</p>
                <p>{duration}</p>
              </div>
              <div>
                <p className="-ft-2 uppercase font-medium">{t('tour.checkIn')}</p>
                <p dangerouslySetInnerHTML={{__html: schedule}}/>
              </div>
              <div>
                <p className="-ft-2 uppercase font-medium">{t('tour.boat')}</p>
                <p dangerouslySetInnerHTML={{__html: boat}}/>
              </div>
            </div>

            <div id="reserva" className="flex lg:hidden justify-center border-t mt-16 pt-16">
              <div className="flex w-full lg:w-1/3 justify-center mx-auto">
                <div id="form">
                  <ReservaCard/>
                </div>
              </div>
            </div>

            <div id="description" className="border-y mt-16 py-16 w-full">
              <div className="ft-0" dangerouslySetInnerHTML={{__html: description}}/>
            </div>

            <div id="itinerario" className="border-b py-16 w-full">
              <h2 className="mb-16">{t('tour.itineraryTitle')}</h2>
              <div className="flex flex-col gap-8">
                {itinerary.map(({time, text}, idx) => (
                  <div key={`it-${idx}`} className="grid grid-cols-5 gap-8 items-start">
                    <p className="font-medium">{time}</p>
                    <p className="col-span-4">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="incluye" className="border-b py-16 w-full">
              <h2 className="mb-16">{t('tour.includesTitle')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {includes.map(({key, value}, idx) => (
                  <div key={`inc-${idx}`} className="w-full grid grid-cols-8 items-center gap-8">
                    <div className="w-full">
                      <div className="relative w-full mx-auto pt-[100%]">
                        <Image src={`/icons-svg/${key}.svg`} layout="fill" alt={value}
                               className="object-center object-contain"/>
                      </div>
                    </div>
                    <div className="col-span-7">
                      <p>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="no-incluye" className="border-b py-16 w-full">
              <h3 className="mb-8">{t('tour.notIncludesTitle')}</h3>
              <ul className="list-disc pl-8 flex flex-col gap-4">
                {notIncludes.map((item, idx) => (
                  <li key={`ninc-${idx}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="ml-auto hidden lg:block md:w-1/3">
          <div className="sticky top-36 mb-20">
            <ReservaCard/>
          </div>
        </div>
      </section>


      <section className="w-full py-8 bg-white shadow-lg border-t sticky bottom-0 lg:bottom-auto top-0 z-[50]">
        <div className="container flex justify-center lg:justify-between">
          <div className="hidden lg:flex items-center gap-8">
            <a href="#fotos" className="ft-0">{t('nav.photos')}</a>
            <a href="#description" className="ft-0">{t('nav.description')}</a>
            <a href="#itinerario" className="ft-0">{t('nav.itinerary')}</a>
            <a href="#incluye" className="ft-0">{t('nav.includes')}</a>
          </div>
          <div
            className="flex w-full lg:w-1/6 bg-brand-5 rounded-lg border border-green-800 shadow-xl h-[4.2rem] px-8 items-center">
            <a href="#form" className="-ft-1 w-full text-white text-center font-medium">{t('nav.bookSeat')}</a>
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
          <p className="ft-11 font-bold text-center mb-8">{t('tour.reviewsTitle')}</p>
        </div>
        <ReviewList/>
      </section>

      <section className="container flex justify-center border-t pt-16">
        <div className="flex w-full lg:w-1/3 justify-center mx-auto">
          <div id="form" className="mb-20">
            <ReservaCard/>
          </div>
        </div>
      </section>

      <section id="tours" className="justify-center border-t py-16">
        <h2 className="container mb-16">{t('tour.otherTours')}</h2>
        <div className="overflow-x-scroll">
        <div className="container flex w-max gap-8">
          {tours.filter((other) => other.slug !== slug).map((other) => (
            <Link key={other.slug} href={`/tours/${other.slug}`} passHref>
              <a className="flex w-[24rem] flex-col overflow-hidden">
                <div className="relative w-full aspect-square pt-[66%] bg-gray-100 rounded-2xl overflow-hidden">
                  {covers[other.slug] && (
                    <Image src={covers[other.slug]} layout="fill" loading="lazy" alt={other.name}
                           className="object-cover object-center"/>
                  )}
                </div>
                <div className="flex flex-col flex-grow py-4">
                  <p className="font-medium">{other.name}</p>
                  <p className="-ft-2 mt-2">
                    {formatPriceFrom(other.priceFrom, other.priceNote, locale)} {' | '}★ {other.rate}
                  </p>
                  <p className="-ft-1 mt-4 text-brand-1 font-medium">{t('home.viewTour')}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
        </div>
      </section>
    </>
  );
}
