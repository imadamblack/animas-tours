/* ===========================================================================
 * CONTENIDO EN ESPAÑOL
 * ---------------------------------------------------------------------------
 * Este archivo y src/content/en.js tienen exactamente la misma estructura.
 * Si agregas un campo aquí, agrégalo también allá.
 *
 * Los `slug` NO se traducen: la misma ruta sirve los dos idiomas
 * (/tours/madagascar-animas y /en/tours/madagascar-animas).
 * ======================================================================== */

/* ---------------------------------------------------------------------------
 * Landing principal (/)
 * ------------------------------------------------------------------------ */
export const home = {
  slug: 'home',
  name: 'Zarpa Tours Vallarta',
  headline: 'TODO: Puerto Vallarta se ve distinto desde el agua',
  subheadline:
    'TODO: promesa principal en una línea (ej. tours en lancha y catamarán a las mejores playas de Bahía de Banderas, con grupos chicos y salida diaria).',
  metaTitle: 'Vallarta WKND | Tours y experiencias en el mar de Puerto Vallarta',
  metaDescription:
    'Tours en catamarán y yate privado a Las Ánimas, Madagascar y Majahuitas, y avistamiento de ballenas en la Bahía de Banderas. Salidas diarias desde Puerto Mágico.',
  rate: 4.3,
  stars: '★★★★★',
  ratings: 25,
  reviewsSource: 'TODO: Google / Tripadvisor',
  description: `<h2>Conocemos la Costa Sur mejor que nadie</h2><br/>
  Trabajamos con los mejores operadores de Las Ánimas, Majahuitas, Madagascar y Quimixto, y elegimos el que realmente embona con tu grupo, tu presupuesto y tu ritmo.<br/>
  Nos encargamos de horarios, traslados, cupos y detalles que solo se aprenden estando aquí, para que tú solo te preocupes por llegar al muelle`,
  // Diferenciadores destacados arriba del fold
  highlights: [
    {
      icon: 'location', // TODO: reemplazar por ícono propio
      title: 'TODO: Salida desde marina céntrica',
      text: 'TODO: detalle del punto de encuentro y facilidad de llegada.',
    },
    {
      icon: 'bebida', // TODO: reemplazar por ícono propio
      title: 'TODO: Bebidas y snacks a bordo',
      text: 'TODO: qué incluye el consumo durante el recorrido.',
    },
  ],
  // Sellos de confianza (sustituyen a las certificaciones del negocio anterior)
  badges: [
    {img: '/landing/badge-1.png', text: 'TODO: Permiso vigente Capitanía de Puerto'},
    {img: '/landing/badge-2.png', text: 'TODO: Embarcaciones con seguro de pasajeros'},
    {img: '/landing/badge-3.png', text: 'TODO: Capitanes y guías certificados'},
  ],
  // Elementos que se repiten en los includes de los tours
  includes: [
    {key: 'salvavidas', value: 'Chalecos salvavidas y equipo de seguridad a bordo'},
    {key: 'barra-libre', value: 'Bebidas incluidas a bordo'},
    {key: 'cerveza', value: 'Cerveza incluida'},
    {key: 'drink', value: 'Bebida de bienvenida'},
    {key: 'snorkel', value: 'Equipo de snorkel, paddle board e inflables acuáticos'},
    {key: 'musica', value: 'Equipo de audio y música'},
  ],
  map: [
    {
      url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.4039406910156!2d-105.244695795991!3d20.653377123199686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8421404014358cb7%3A0xa452561255422540!2sVallarta%20WKND!5e0!3m2!1sen!2smx!4v1785870451402!5m2!1sen!2smx',
      description: 'Módulo Vallarta WKND',
      place: 'Puerto Mágico',
      city: 'Puerto Vallarta',
      state: 'Jalisco',
      country: 'México',
    },
    {
      url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.694793130182!2d-105.23936700000002!3d20.600517999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8421454b2f06f169%3A0x882ebcec1babc084!2sLos%20Muertos%20Beach%20Pier!5e0!3m2!1sen!2smx!4v1785868675967!5m2!1sen!2smx',
      description: '',
      place: 'Muelle Los Muertos',
      city: 'Puerto Vallarta',
      state: 'Jalisco',
      country: 'México',
    },
  ],
};

/* ---------------------------------------------------------------------------
 * Tours (una página por tour)
 * ------------------------------------------------------------------------ */
export const tours = [
  {
    slug: 'madagascar-animas',
    name: 'Madagascar & Las Ánimas',
    tagline: 'Más aventura. Más diversión. En menos tiempo.',
    duration: '5½ a 6 horas',
    schedule: 'Puerto Mágico<br/>Muelle Los Muertos',
    boat: 'Catamarán 150 pasajeros',
    priceFrom: 1400,
    priceNote: 'p/p',
    rate: 4.3,
    stars: '★★★★★',
    ratings: 25,
    description: `Un tour diseñado para familias, parejas y grupos de amigos que buscan una experiencia completa sin madrugar.<br/><br/>
En solo 6 horas navegas por lo mejor de la costa sur de Puerto Vallarta.<br/><br/>
Parada fotográfica en los Arcos de Mismaloya.<br/><br/>
Snorkel, paddle board, kayak o inflables acuáticos en Playa Madagascar<br/><br/>
2 horas en el club de playa Las Ánimas, alimentos incluidos y tiempo libre.<br/><br/>
Música, animación y concursos.<br/><br/>
<b>Recomendaciones prácticas:</b><br/>
Llega 30 minutos antes de la hora de salida para tu registro, ya que en el check-in eliges tu platillo del menú. Lleva traje de baño, toalla, bloqueador biodegradable, gorra, lentes de sol y una identificación oficial.<br/><br/>
<b>Aceptamos tarjeta y efectivo.</b>`,
    includes: [
      {key: 'barra-libre', value: 'Barra libre internacional a bordo'},
      {key: 'drink', value: 'Drink de bienvenida (con o sin alcohol)'},
      {key: 'cerveza', value: 'Cerveza Corona 1/4'},
      {key: 'snack', value: 'Snack de bienvenida de temporada'},
      {key: 'comida', value: 'Comida en Playa Las Ánimas a elegir entre 4 opciones de menú'},
      {key: 'snorkel', value: 'Equipo de snorkel, paddle board, kayak, inflables acuáticos'},
      {key: 'salvavidas', value: 'Chalecos salvavidas'},
      {key: 'musica', value: 'Música'},
      {key: 'animacion', value: 'Animación a bordo'},
      {key: 'concursos', value: 'Concursos durante el regreso'},
    ],
    notIncludes: [
      'Jetski',
      'Paseo en banana',
      'Bebidas en la playa',
      'Gratitud para la tripulación',
      'Transporte al muelle',
    ],
    itinerary: [
      {time: 'Terminal Marítima', text: 'Check-in de pasajeros y abordaje'},
      {
        time: 'Muelle Los Muertos',
        text: 'Segundo punto de abordaje, junto al muelle icónico de la playa y su vela',
      },
      {
        time: 'Arcos de Mismaloya',
        text: 'Parada para fotos frente a este atractivo natural',
      },
      {
        time: 'Playa Madagascar',
        text: 'Actividades acuáticas: snorkel, paddle board, kayak e inflables acuáticos',
      },
      {
        time: 'Las Ánimas',
        text: 'Tiempo libre en la playa y comida en el restaurante',
      },
      {
        time: 'Regreso a Puerto Mágico',
        text: 'Fiesta a bordo con música, baile, concursos y animación',
      },
    ],
    // Uno o varios puntos de abordaje. El orden aquí es el orden en pantalla.
    map: [
      {
        url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.4039406910156!2d-105.244695795991!3d20.653377123199686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8421404014358cb7%3A0xa452561255422540!2sVallarta%20WKND!5e0!3m2!1sen!2smx!4v1785870451402!5m2!1sen!2smx',
        description: 'Check-in a las 11:30 am. Zarpamos a las 12:00 pm.',
        place: 'Puerto Mágico',
        city: 'Puerto Vallarta',
        state: 'Jalisco',
        country: 'México',
      },
      {
        url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.694793130182!2d-105.23936700000002!3d20.600517999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8421454b2f06f169%3A0x882ebcec1babc084!2sLos%20Muertos%20Beach%20Pier!5e0!3m2!1sen!2smx!4v1785868675967!5m2!1sen!2smx',
        description: 'Check-in a las 12:00 pm. Zarpamos a las 12:40 pm.',
        place: 'Muelle Los Muertos',
        city: 'Puerto Vallarta',
        state: 'Jalisco',
        country: 'México',
      },
    ],
  },
  {
    slug: 'adelita-yate-privado',
    name: 'Adelita Yate Privado',
    tagline: 'Pasa tu día en Las Ánimas, Majahuitas y las playas más bellas de la Costa Sur',
    duration: '4, 6 u 8 horas',
    schedule: 'Horario flexible, se ajusta a las necesidades del cliente',
    boat: 'Yate 30 pasajeros',
    priceFrom: 12000,
    priceNote: 'por 4 horas',
    rate: 4.3,
    stars: '★★★★★',
    ratings: 25,
    description: `Un yate privado donde el ambiente lo pones tú para fiestas, despedidas de soltera, cumpleaños y celebraciones familiares en el mar sin compartir la embarcación con nadie más.<br/><br/>
Tú diseñas tu propio recorrido por las playas más icónicas de la Bahía de Banderas y eliges el horario que mejor te acomode.<br/><br/>
<b>Esquemas de renta:</b><br/>4 horas por $12,000 MXN<br/>6 horas por $15,000 MXN<br/>8 horas por $18,000 MXN<br/><br/>
Si necesitas más tiempo, la hora extra tiene un costo de $2,500 MXN.<br/><br/>
Puedes subir tus propios alimentos y bebidas sin costo adicional.<br/><br/>
<b>Plan Todo Incluido por $500 MXN adicionales por persona:</b><br/>
Barra libre nacional con cerveza sin límite y snacks.<br/>
Se confirma con al menos 24 horas de anticipación y solo se paga por las personas que viajan.<br/><br/>
Para reservar se solicita un anticipo del 50%. Las cancelaciones se aceptan con 24 horas de anticipación a la fecha de salida. En caso de mal clima el tour se reprograma; el reembolso aplica únicamente cuando la autoridad cierra el puerto.`,
    includes: [
      {key: 'barra-libre', value: 'Agua embotellada'},
      {key: 'hielos', value: 'Hielo'},
      {key: 'cerveza', value: '24 cervezas de tu preferencia'},
      {key: 'snorkel', value: 'Equipos de snorkel, Paddle boards e Inflable'},
      {key: 'salvavidas', value: 'Chalecos salvavidas'},
      {key: 'musica', value: 'Audio premium'},
      {key: 'tripulacion', value: 'Capitán y marineros profesionales'},
      {key: 'seguro', value: 'Seguro de responsabilidad civil y de pasajeros'},
    ],
    notIncludes: [
      'Tarifa portuaria de $35 MXN por persona, se paga directamente en el muelle',
      'Propinas para la tripulación',
      'Transportación hotel - muelle',
      'Alimentos, salvo que se contrate el Plan Todo Incluido',
      'Bebidas adicionales a las 24 cervezas incluidas',
    ],
    itinerary: [
      {
        time: 'Reserva',
        text: 'Elige tu punto de salida, horario y horas. Se solicita anticipo del 50%',
      },
      {
        time: '24h antes',
        text: 'Confirmas el Plan Todo Incluido si lo deseas, pagando solo por las personas que viajan',
      },
      {time: 'El día', text: 'Check-in y abordaje. A bordo te esperan agua, hielo y cervezas'},
      {
        time: 'Durante',
        text: 'Ruta a tu medida por las playas de la Bahía de Banderas, con snorkel, paddle board e inflable en cada anclaje',
      },
      {
        time: 'Fin',
        text: 'Regreso al punto de salida. Si necesitas más tiempo, la hora extra cuesta $2,500 MXN',
      },
    ],
    map: [
      {
        url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.4039406910156!2d-105.244695795991!3d20.653377123199686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8421404014358cb7%3A0xa452561255422540!2sVallarta%20WKND!5e0!3m2!1sen!2smx!4v1785870451402!5m2!1sen!2smx',
        description: 'Módulo de Vallarta WKND.',
        place: 'Puerto Mágico',
        city: 'Puerto Vallarta',
        state: 'Jalisco',
        country: 'México',
      },
      {
        url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.694793130182!2d-105.23936700000002!3d20.600517999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8421454b2f06f169%3A0x882ebcec1babc084!2sLos%20Muertos%20Beach%20Pier!5e0!3m2!1sen!2smx!4v1785868675967!5m2!1sen!2smx',
        description: '',
        place: 'Muelle Los Muertos',
        city: 'Puerto Vallarta',
        state: 'Jalisco',
        country: 'México',
      },
    ],
  },
  {
    slug: 'vallarta-whale-watching',
    name: 'Vallarta Whale Watching',
    tagline: 'Tus asientos de primera fila en el espectáculo del océano.',
    duration: '3½ horas',
    schedule: 'Salidas 9:00 am y 1:00 pm. Temporada del 8 de diciembre al 20 de marzo',
    boat: 'Catamarán 150 personas',
    priceFrom: 1600,
    priceNote: 'p/p',
    rate: 4.3,
    stars: '★★★★★',
    ratings: 25,
    description: `Vive la emoción del avistamiento de ballenas jorobadas en la Bahía de Banderas a bordo del Vallarta Sol, un catamarán de dos cubiertas con espacio de sobra para moverte, sentarte cómodo y elegir tu ángulo del espectáculo. Zarpamos de Puerto Mágico y navegamos la bahía siguiendo la actividad de las ballenas, con 3.5 horas de recorrido, guía y biólogo a bordo, y barra libre nacional que se abre en cuanto salimos de zona federal. La segunda cubierta da vista elevada para fotografía y la principal ofrece sombra y asientos para quien prefiere tomarlo con calma.<br/><br/>
La temporada corre aproximadamente del 8 de diciembre al 20 de marzo, sujeta a la autorización de SEMARNAT. Hay dos salidas diarias, a las 9:00 am y a la 1:00 pm.<br/><br/>
Es apto para todas las edades y funciona especialmente bien para grupos grandes, familias completas y empresas: hay espacio, servicio a bordo y tiempo suficiente para disfrutar la navegación además del avistamiento. Los menores de 6 a 11 años pagan $800 MXN, los niños de 3 a 5 años cubren únicamente un consumo de $200 MXN y los menores de 3 años no pagan. Si vienes con un grupo grande, escríbenos para cotizar un precio especial.<br/><br/>
Recomendaciones prácticas: llega al menos 30 minutos antes de tu hora de salida. Lleva bloqueador biodegradable, gorra, lentes de sol, una capa ligera para el viento y tu cámara.<br/><br/>
El avistamiento ocurre en hábitat natural, por lo que no podemos garantizar que veas ballenas en cada salida. Las cancelaciones se aceptan con 24 horas de anticipación a la fecha de salida. En caso de mal clima el tour se reprograma; el reembolso aplica únicamente cuando la autoridad cierra el puerto.`,
    includes: [
      {
        key: 'buffet',
        value: 'Focaccia de pechuga de pavo con toque de stracciatella, crema de pistacho y verduras frescas, más barra de granola',
      },
      {
        key: 'drink',
        value: 'Barra libre nacional: cerveza Corona 1/4, ron, vodka, whisky y tequila. También jugo, café y refrescos',
      },
      {key: 'salvavidas', value: 'Chalecos salvavidas y equipo de seguridad a bordo'},
      {key: 'guia', value: 'Guía y biólogo a bordo durante todo el recorrido'},
    ],
    notIncludes: [
      'Tarifa portuaria de $35 MXN por persona, se paga directamente en el muelle',
      'Propinas para la tripulación',
      'Transportación hotel - muelle',
      'Bebidas premium o importadas',
    ],
    itinerary: [
      {time: '8:30 am / 12:30 pm', text: 'Check-in en Puerto Mágico'},
      {time: '9:00 am / 1:00 pm', text: 'Zarpamos a bordo del Vallarta Sol'},
      {time: 'Al salir de zona federal', text: 'Se abre la barra libre nacional'},
      {
        time: 'Durante el recorrido',
        text: 'Navegación por la Bahía de Banderas con guía y biólogo a bordo, y dos cubiertas para elegir tu punto de observación',
      },
      {time: 'A bordo', text: 'Servicio de focaccia y barra de granola'},
      {time: '12:30 pm / 4:30 pm', text: 'Regreso a Puerto Mágico'},
    ],
    map: [
      {
        url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.4039406910156!2d-105.244695795991!3d20.653377123199686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8421404014358cb7%3A0xa452561255422540!2sVallarta%20WKND!5e0!3m2!1sen!2smx!4v1785870451402!5m2!1sen!2smx',
        description: 'Módulo de Vallarta WKND.',
        place: 'Puerto Mágico',
        city: 'Puerto Vallarta',
        state: 'Jalisco',
        country: 'México',
      },
      {
        url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.694793130182!2d-105.23936700000002!3d20.600517999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8421454b2f06f169%3A0x882ebcec1babc084!2sLos%20Muertos%20Beach%20Pier!5e0!3m2!1sen!2smx!4v1785868675967!5m2!1sen!2smx',
        description: '',
        place: 'Muelle Los Muertos',
        city: 'Puerto Vallarta',
        state: 'Jalisco',
        country: 'México',
      },
    ],
  },
];
