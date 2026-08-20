import Image from 'next/image';
import { useT } from '../i18n/ui';

/**
 * Galería en modal.
 *
 * @param {string[]} images rutas completas de las imágenes (ya leídas del disco en build)
 * @param {string}   title  nombre del tour, se usa para el alt
 * @param {function} onClose
 */
export default function ModalPhotoGallery({images = [], title = '', onClose}) {
  const t = useT();

  return (
    <div className="fixed inset-0 z-[100] bg-white/90 overflow-y-scroll">
      <div className="fixed inset-0" onClick={onClose}/>
      <div className="container relative items-center justify-center">
        <div
          role="button"
          aria-label={t('gallery.close')}
          className="ft-1 flex fixed top-8 z-[100] justify-center items-center h-20 w-20 rounded-full cursor-pointer bg-white border shadow-lg"
          onClick={onClose}
        >✕</div>
        <div className="relative my-40 gap-8 grid grid-cols-1 md:grid-cols-2">
          {images.map((src, idx) => (
            <div key={src} className="relative w-full aspect-square flex snap-center">
              <Image
                src={src}
                layout="fill"
                loading="lazy"
                alt={`${title} ${idx + 1}`}
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
