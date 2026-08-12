import fs from 'fs';
import path from 'path';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

// `video.mp4` y su poster `video.jpg` viven en la misma carpeta que las fotos,
// pero los maneja getTourVideo: no entran al carrusel.
const VIDEO_BASENAME = 'video';

const basename = (file) => path.basename(file, path.extname(file)).toLowerCase();

/**
 * Lee las imágenes reales de /public/imgSlider/<slug> en tiempo de build.
 *
 * Solo debe llamarse desde getStaticProps / getServerSideProps (usa `fs`).
 * Devuelve las rutas públicas ordenadas numéricamente: 00, 01, 02, ...
 * La primera del arreglo es la imagen principal (normalmente 00.jpg).
 *
 * @param {string} slug carpeta dentro de /public/imgSlider
 * @returns {string[]} ej. ['/imgSlider/adelita/00.jpg', '/imgSlider/adelita/01.jpg']
 */
export function getGalleryImages(slug) {
  if (!slug) return [];

  const dir = path.join(process.cwd(), 'public', 'imgSlider', slug);

  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (error) {
    // La carpeta no existe todavía: la página se renderiza sin galería.
    return [];
  }

  return files
    .filter((file) => IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()))
    .filter((file) => basename(file) !== VIDEO_BASENAME)
    .sort((a, b) => a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}))
    .map((file) => `/imgSlider/${slug}/${file}`);
}

/**
 * Busca el video del tour `video.mp4` en /public/imgSlider/<slug>.
 *
 * El poster `video.jpg` es opcional: si no existe, quien renderice debe usar
 * la primera foto de la galería. Igual que getGalleryImages, solo corre en build.
 * Los tours sin video simplemente no renderizan la sección.
 *
 * @param {string} slug carpeta dentro de /public/imgSlider
 * @returns {{src: string, poster: string|null}|null}
 */
export function getTourVideo(slug) {
  if (!slug) return null;

  const dir = path.join(process.cwd(), 'public', 'imgSlider', slug);

  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (error) {
    return null;
  }

  const assets = files.filter((file) => basename(file) === VIDEO_BASENAME);
  const video = assets.find((file) => path.extname(file).toLowerCase() === '.mp4');

  if (!video) return null;

  const poster = assets.find((file) =>
    IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())
  );

  return {
    src: `/imgSlider/${slug}/${video}`,
    poster: poster ? `/imgSlider/${slug}/${poster}` : null,
  };
}

export default getGalleryImages;
