# Zarpa Tours Vallarta — estado de la adaptación

Repo clonado del proyecto de Ramada Encore by Wyndham. Toda la información explícita del negocio anterior fue removida o sustituida por placeholders `TODO:`.

## Qué cambió

| Archivo | Cambio |
| --- | --- |
| `info.js` | Datos globales de Zarpa Tours con placeholders. Se conservó el webhook n8n heredado. |
| `DataAtlas.js` | Ya no es catálogo de sedes. Ahora exporta `home` (landing), `tours` (3 tours) y `getTour(slug)`. |
| `src/pages/index.js` | Landing estática de Zarpa. Sin `ModalSedeSelector`, sin `getServerSideProps`, sin `?sede=`. Agrega bloque de listado de tours. |
| `src/components/TourPage.js` | **Nuevo.** Plantilla de detalle de tour (galería, itinerario, incluye, no incluye, mapa, form). |
| `src/pages/tours/tour-1\|2\|3.js` | **Nuevos.** Una página por tour; sólo inyectan su objeto de `DataAtlas.js`. |
| `src/components/form/opt-in-form.js` | Flujo webhook + `/thankyou`, sin redirección externa. Campos: fecha, personas, nombre, WhatsApp, correo, tour. |
| `src/pages/thankyou.js` | Confirmación simple con CTA a WhatsApp. Ya no depende de `DataAtlas`. |
| `src/components/layout/header.js` | Botón "¿Vas a otra ciudad?" → botón de WhatsApp. |
| `src/pages/_app.js` | Sin `SedeSelectorProvider`. |
| `src/components/mapa.js` | Prop `sede` → `lugar`. |
| `src/components/photoModal.js` | Prop `sede` → `gallery`, agrega `title`. |
| `src/components/ReviewList.js` | Reseñas del hotel → placeholders. |
| `package.json` | `name` → `zarpa-tours-vallarta`. |

## Qué se eliminó

- `src/components/sedeSelector.js`, `src/context/SedeSelectorContext.js`, `src/components/AllLocations.js`
- `public/imgSlider/{ags,gdl,gdl-a,mty,pue,qro,slp}` (fotos de hotel)
- `public/Logo_Encore_Black.png`, `Logo_Encore_White.png`, `public/certi/`, `public/AllLocationes/`
- `public/landing/mapa.png`, `icon-1|2|3.png` (certificaciones Wyndham)

## Placeholders generados (reemplazar con material real)

- `public/imgSlider/{home,tour-1,tour-2,tour-3}/00.jpg` a `18.jpg` — 19 imágenes por galería. La página usa `00` como principal, `01–04` en el grid y `01–18` en el modal y el carrusel móvil.
- `public/landing/badge-1|2|3.png` — sellos de confianza.
- `public/img-Comentarios/01–06.png` — avatares de reseñas.
- `public/logo.png` — logo provisional en texto.

## Pendientes que requieren tu decisión

1. **`.env`** conserva el `PIXEL` y el `FB_CAPI_TOKEN` del negocio anterior. Hay que sustituirlos por los de Zarpa antes de publicar.
2. **`optInWebhook`** en `info.js` sigue apuntando al webhook n8n heredado. Confirmar o cambiar.
3. **Nombre de `DataAtlas.js`.** El nombre viene de la cadena hotelera; ahora contiene el contenido de Zarpa. Se puede renombrar a `content.js` (son 6 imports por actualizar).
4. **Slugs de los tours.** Los archivos `tour-1|2|3.js` y las carpetas de imágenes deben renombrarse al slug real (ej. `islas-marietas`).
5. **Íconos en `public/icons/`.** Son de hotelería (alberca, almohada, room-service, blackout…). Los placeholders reutilizan los genéricos (`bebida`, `buffet`, `musica`, `location`, `caja-seguridad`, `estacionamiento`, `wifi`). Convendría un set propio: snorkel, chaleco, embarcación, capitán, ballena.
6. **Páginas heredadas de un proyecto aún más viejo**, sin relación con Zarpa ni con el hotel: `src/pages/survey.js` (cuestionario de certificaciones ISO) y `src/pages/scheduler.js` (Calendly de "dezka"). Sugiero borrarlas.
7. **Componentes legados sin uso** en `src/components/` con contenido hotelero: `WeOffer.js` (importa `/public/Iconos/` que ya no existe), `reserva.js`, `reserva_old.js`, `opt-in-form-h.js`, `calendario.js`, `caracteristicas.js`, `blockbuster.js`, `descripcion-detallada.js`, `faqs.js`, `imagegrid.js`, `slider.js`, `ImageSlider.js`, `client-logos.js`, `titulo.js`, `subtitulo.js`, `Calificacion.js`, `navigation/menu.js`. No rompen el build porque ninguna página los importa, pero son peso muerto.
8. **`_document.js`** apunta a `/images/icon.png` como favicon; esa ruta no existe en el repo.

## Verificación hecha

- Los 14 archivos tocados parsean sin errores (Babel + preset React).
- Todos los imports relativos de las páginas resuelven a archivos existentes.
- `grep` de `encore|wyndham|ramada|sede` en `src/` y raíz: sin coincidencias del negocio anterior.
- `next build` no se pudo correr en el sandbox Linux (el binario SWC instalado es de macOS y no hay acceso a npm). Conviene correr `npm run build` en local.
