import fs from 'fs';
import path from 'path';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

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
    .sort((a, b) => a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}))
    .map((file) => `/imgSlider/${slug}/${file}`);
}

export default getGalleryImages;
