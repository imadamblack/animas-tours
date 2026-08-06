// Reseñas reales de Vallarta WKND. Fuentes:
//  - Tripadvisor: https://www.tripadvisor.com/Attraction_Review-g150793-d23496030-Reviews-Vallarta_WKND-Puerto_Vallarta.html
//  - Google Maps y Facebook (https://www.facebook.com/vallartawknd/reviews)
//
// Cada reseña guarda su texto en los dos idiomas del sitio:
//   comentario.es  versión en español
//   comentario.en  versión en inglés
//   comentario_original  texto original completo, tal como lo dejó la persona,
//                        para referencia y verificación. No se muestra.
// El avatar se genera con la inicial del nombre, no con imagen.

import { useLocale } from '../i18n/ui';

// Primer carácter del nombre en mayúscula. Usa Array.from para no romper
// nombres con caracteres no latinos (p. ej. "Светлана М" → "С").
const inicial = (nombre = "") => (Array.from(nombre.trim())[0] || "?").toUpperCase();

// Paleta de marca rotativa para el fondo del avatar.
const avatarColors = [
    "bg-brand-1",
    "bg-brand-4",
    "bg-brand-2",
    "bg-brand-5",
    "bg-brand-3",
    "bg-brand-1",
];

const comentarios = [
    {
        nombre: "Zarael Rodríguez",
        ciudad: {es: "Local Guide", en: "Local Guide"},
        pais: "Google",
        calificacion: {es: "⭐⭐⭐⭐⭐", en: "⭐⭐⭐⭐⭐"},
        fecha: {es: "Hace 2 semanas", en: "2 weeks ago"},
        tipo: {es: "Tour Las Ánimas", en: "Las Ánimas tour"},
        comentario: {
            es: "Todo excelente, el servicio excelente 10/10. Aprovechamos al máximo la barra libre, un trago tras otro. La comida se sirve en Las Ánimas; es buena y sabrosa. Nos atendió Monse. Muchísimas gracias, todo excelente.",
            en: "Everything was excellent, the service was excellent 10/10. We took full advantage of the open bar, one drink after another. The food is served at Las Ánimas; it's good and tasty. Monse took care of us. Thank you so much, everything was excellent.",
        },
        comentario_original: "Everything was excellent, the service was excellent 10/10. We took full advantage of the open bar, one drink after another (note: this is only on the boat). The bar only opens when everyone is on board and closes when we reach the federal zone (which is when we arrive at the marina). The food is served at Las Ánimas; it's good (don't expect 5-star restaurant quality), but it's tasty. Enjoy Las Ánimas beach, and if you want to have a drink there (drinks are from the restaurant and extra) (although you can bring your own non-alcoholic drinks on the boat and take them off at Las Ánimas without any problem). Beer at the restaurant is $60 pesos, and Cielo Rojo is $140. I consider these prices reasonable for the beach. Keep the weather in mind, as we didn't see many fish due to the rain, but everything was excellent. The food and drinks were delicious. We had quarter-liter Corona beers, vodka, tequila, whiskey, and rum. We were served by Monse. Thank you so much, everything was excellent. If you have an elderly or disabled person with you, they might not be able to enjoy it since you have to take a boat to get to Las Ánimas and then swim out to snorkel, but it was all excellent. As you arrive, they give you a chance to choose your spot. We arrived early and all four of us went; they put you on the boat in that order, from first to last. We arrived at the marina and stayed on the beach to watch the sunset."
    },
    {
        nombre: "Gill Cullen",
        ciudad: {es: "", en: ""},
        pais: "Facebook",
        calificacion: {es: "👍 Recomienda", en: "👍 Recommends"},
        fecha: {es: "Abril 2026", en: "April 2026"},
        tipo: {es: "Viaje en familia", en: "Family trip"},
        comentario: {
            es: "Pasamos un Domingo de Pascua inolvidable con el increíble equipo de Vallarta WKND. Lo mejor de todo fue ver a mi hijo de 10 años disfrutar tanto; ¡no se quería bajar! Ahora dice que de grande quiere trabajar como parte del crew. Eso dice todo sobre la calidez y la gran energía de este equipo. ¡Altamente recomendados!",
            en: "We spent an unforgettable Easter Sunday with the amazing crew at Vallarta WKND. The highlight? My 10-year-old son had the absolute time of his life and did not want to get off the boat! He is now telling us he wants to work as a crew member when he grows up. That says everything about how kind and fun this team is. Highly recommended!",
        },
        comentario_original: "We spent our Easter Sunday with the most amazing crew at Vallarta Wknd, and it was pure magic. We were there with the people we love most—our chosen Mexican family—and the atmosphere couldn't have been more perfect. The highlight? My 10-year-old son had the absolute time of his life! He's already asking to go back every single day and is so inspired that he told us he wants to work as a crew member here when he grows up. That speaks volumes about how professional, kind, and fun this team is. We can't wait to get back out on the water with these amazing people. Do not miss out on this experience!"
    },
    {
        nombre: "Светлана М",
        ciudad: {es: "", en: ""},
        pais: "Tripadvisor",
        calificacion: {es: "⭐⭐⭐⭐⭐", en: "⭐⭐⭐⭐⭐"},
        fecha: {es: "Febrero 2026", en: "February 2026"},
        tipo: {es: "Avistamiento de ballenas", en: "Whale watching"},
        comentario: {
            es: "¡Excelente! Un tour precioso, vimos muchísimas ballenas. El equipo es muy profesional y atento. El catamarán no va sobrecargado de gente. ¡Todo estuvo hermoso!",
            en: "Great! Beautiful tour, we saw a lot of whales. The team is very professional and attentive. The catamaran is not very crowded. Everything was beautiful!",
        },
        comentario_original: "Great!!! Beautiful tour, we saw a lot of whales. The team is very professional and attentive. The catamaran is not very crowded. Everything was beautiful!!!"
    },
    {
        nombre: "Irais M",
        ciudad: {es: "", en: ""},
        pais: "Tripadvisor",
        calificacion: {es: "⭐⭐⭐⭐⭐", en: "⭐⭐⭐⭐⭐"},
        fecha: {es: "Enero 2026", en: "January 2026"},
        tipo: {es: "Tour en catamarán", en: "Catamaran tour"},
        comentario: {
            es: "Todo el personal muy profesional y cálido. La comida que ofrecen también es de muy buena calidad. Una experiencia extraordinaria que sin duda repetiría.",
            en: "All the staff very professional and warm. The food they offer is very good quality, too. An extraordinary experience that I would certainly repeat.",
        },
        comentario_original: "All the staff very professional and warm. The food and offered very good quality, too. An extraordinary experience that I would certainly repeat."
    },
    {
        nombre: "Alexa",
        ciudad: {es: "Hollywood, Florida", en: "Hollywood, Florida"},
        pais: "Tripadvisor",
        calificacion: {es: "⭐⭐⭐⭐⭐", en: "⭐⭐⭐⭐⭐"},
        fecha: {es: "Julio 2022", en: "July 2022"},
        tipo: {es: "Viaje en familia", en: "Family trip"},
        comentario: {
            es: "¡Increíble! Fue una experiencia buenísima y mi familia y yo la disfrutamos de verdad. Tengo una hija autista y un niño pequeño muy inquieto: fueron atentos, amables, serviciales y profesionales. Recomiendo esta empresa sin dudarlo y volvería con ellos. Pasamos un día maravilloso y nos sentimos seguros todo el tiempo.",
            en: "Amazing! This was such an awesome experience and my family and I truly enjoyed it. I have an autistic daughter and a wild toddler: they were accommodating, friendly, helpful and professional. I would definitely recommend this company and would go with them again. We had a wonderful day and felt safe at all times.",
        },
        comentario_original: "AMAZING!!! This was such an awesome experience! My family and I truly enjoyed this trip! I have an autistic daughter and a wild toddler, they were accommodating, friendly, helpful and professional! I would definitely recommend this company and would them again!!! We had a wonderful day and felt safe at all times!"
    },
    {
        nombre: "Jérémy B",
        ciudad: {es: "Francia", en: "France"},
        pais: "Tripadvisor",
        calificacion: {es: "⭐⭐⭐⭐⭐", en: "⭐⭐⭐⭐⭐"},
        fecha: {es: "Diciembre 2021", en: "December 2021"},
        tipo: {es: "Grupo de amigos", en: "Trip with friends"},
        comentario: {
            es: "Disfruté muchísimo el tour en mis vacaciones con mis amigos. Fuimos a Los Arcos, Las Ánimas y Quimixto y estuvo increíble. Desde Francia, cuando planeábamos el viaje a México, decidimos reservar en el sitio web porque fue muy fácil. Fue muy divertido y nos integraron con todos.",
            en: "I enjoyed the tour a lot on my vacation with my friends. We went to Los Arcos, Las Ánimas and Quimixto and it was awesome. Back in France, while we were planning our trip to Mexico, we booked on the website because it was very easy. It was a lot of fun and they made us feel part of the group.",
        },
        comentario_original: "I enjoyed a lot the tour on my vacation with my friends, we went to Arcos, Animas, Quimixto and it was AWESOME, since we were planning in France our trip to México we decided to do the reservation on the website cause it was very easy. It was a lot of fun and they integrated us with everyone"
    }
    // Reseña real disponible, no incluida para dejar 6 tarjetas pares:
    // Gabriel Letourneau, Tripadvisor, dic 2022, 5★:
    // "Best trip to do in nuevo vallarta, snorkeling, hike, and beautiful
    //  scenery. Dont miss it. Lots of fun with all the crewmembers"
];

const ReviewList = () => {
    const locale = useLocale();

    // Toma el campo en el idioma activo; si falta, cae al español.
    const pick = (field) => (typeof field === 'string' ? field : (field?.[locale] ?? field?.es ?? ''));

    return (
        <div className='w-full mx-auto mt-10 px-[30px] py-6'>
            {/* Contenedor grid para 2 columnas en PC y 1 en móvil */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 mb-10">
                {comentarios.map((comentario, index) => (
                    <div key={`com-${index}`} className="bg-white p-6 rounded-lg ">
                        <div className="flex flex-row items-center gap-8">
                            <div
                                aria-hidden="true"
                                className={`rounded-full w-[64px] h-[64px] shrink-0 flex items-center justify-center text-white text-2xl font-medium select-none ${avatarColors[index % avatarColors.length]}`}
                            >
                                {inicial(comentario.nombre)}
                            </div>
                            <div>
                                <div className="ft-1 font-medium">{comentario.nombre}</div>
                                <div className="-ft-1">{comentario.pais}</div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-8 mt-4">
                            <div className="-ft-1">{pick(comentario.calificacion)}</div>
                            |
                            <div className="-ft-1">{pick(comentario.fecha)}</div>
                            {/*|*/}
                            {/*<div className="-ft-1">{pick(comentario.tipo)}</div>*/}
                        </div>
                        <div className="mt-8 ft-0">{pick(comentario.comentario)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewList;
