/* ===========================================================================
 * ENGLISH CONTENT
 * ---------------------------------------------------------------------------
 * Mirrors src/content/es.js field by field. If you add a field there, add it
 * here too, otherwise the English page will render undefined.
 *
 * Slugs are NOT translated: the same route serves both languages
 * (/tours/madagascar-animas and /en/tours/madagascar-animas).
 *
 * Prices written inside the copy are generated with `usd()` so they follow the
 * MXN_TO_USD rate in src/utils/formatters.js instead of being hardcoded.
 * ======================================================================== */

import { usd } from '../utils/formatters';

/* ---------------------------------------------------------------------------
 * Home landing (/en)
 * ------------------------------------------------------------------------ */
export const home = {
  slug: 'home',
  name: 'Zarpa Tours Vallarta',
  headline: 'TODO: Puerto Vallarta looks different from the water',
  subheadline:
    'TODO: one-line main promise (e.g. boat and catamaran tours to the best beaches in Banderas Bay, small groups, daily departures).',
  metaTitle: 'Vallarta WKND | Boat tours and ocean experiences in Puerto Vallarta',
  metaDescription:
    'Catamaran and private yacht tours to Las Ánimas, Madagascar and Majahuitas, plus whale watching in Banderas Bay. Daily departures from Puerto Mágico.',
  rate: 4.3,
  stars: '★★★★★',
  ratings: 25,
  reviewsSource: 'TODO: Google / Tripadvisor',
  description: `<h2>Nobody knows the South Shore better</h2><br/>
  We work with the best operators in Las Ánimas, Majahuitas, Madagascar and Quimixto, and we pick the one that actually fits your group, your budget and your pace.<br/>
  We handle schedules, transfers, availability and all the small details you only learn by living here, so the only thing you have to worry about is getting to the dock.`,
  // Key differentiators above the fold
  highlights: [
    {
      icon: 'location', // TODO: replace with final icon
      title: 'TODO: Departures from a central marina',
      text: 'TODO: meeting point details and how easy it is to get there.',
    },
    {
      icon: 'bebida', // TODO: replace with final icon
      title: 'TODO: Drinks and snacks on board',
      text: 'TODO: what is included during the trip.',
    },
  ],
  // Trust badges
  badges: [
    {img: '/landing/badge-1.png', text: 'TODO: Current Harbor Master permit'},
    {img: '/landing/badge-2.png', text: 'TODO: Boats with passenger insurance'},
    {img: '/landing/badge-3.png', text: 'TODO: Certified captains and guides'},
  ],
  // Items shared across every tour
  includes: [
    {key: 'salvavidas', value: 'Life jackets and safety equipment on board'},
    {key: 'barra-libre', value: 'Drinks included on board'},
    {key: 'cerveza', value: 'Beer included'},
    {key: 'drink', value: 'Welcome drink'},
    {key: 'snorkel', value: 'Snorkel gear, paddle boards and water inflatables'},
    {key: 'musica', value: 'Sound system and music'},
  ],
  map: [
    {
      url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.4039406910156!2d-105.244695795991!3d20.653377123199686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8421404014358cb7%3A0xa452561255422540!2sVallarta%20WKND!5e0!3m2!1sen!2smx!4v1785870451402!5m2!1sen!2smx',
      description: 'Vallarta WKND booth',
      place: 'Puerto Mágico',
      city: 'Puerto Vallarta',
      state: 'Jalisco',
      country: 'Mexico',
    },
    {
      url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.694793130182!2d-105.23936700000002!3d20.600517999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8421454b2f06f169%3A0x882ebcec1babc084!2sLos%20Muertos%20Beach%20Pier!5e0!3m2!1sen!2smx!4v1785868675967!5m2!1sen!2smx',
      description: '',
      place: 'Los Muertos Pier',
      city: 'Puerto Vallarta',
      state: 'Jalisco',
      country: 'Mexico',
    },
  ],
};

/* ---------------------------------------------------------------------------
 * Tours (one page each)
 * ------------------------------------------------------------------------ */
export const tours = [
  {
    slug: 'madagascar-animas',
    name: 'Madagascar & Las Animas',
    tagline: 'More adventure. More fun. In less time.',
    duration: '5½ to 6 hours',
    schedule: 'Puerto Mágico<br/>Los Muertos Pier',
    boat: 'Catamaran, 150 passengers',
    priceFrom: 1400,
    priceNote: 'per person',
    rate: 4.3,
    stars: '★★★★★',
    ratings: 25,
    description: `A tour built for families, couples and groups of friends who want the full experience without waking up at dawn.<br/><br/>
In just 6 hours you sail along the best of Puerto Vallarta's south shore.<br/><br/>
Photo stop at the Mismaloya Arches.<br/><br/>
Snorkeling, paddle boarding, kayaking and water inflatables at Madagascar Beach.<br/><br/>
2 hours at the Las Ánimas beach club, with lunch included and free time.<br/><br/>
Music, entertainment and games on board.<br/><br/>
<b>Practical tips:</b><br/>
Arrive 30 minutes before departure to check in, since that is when you choose your dish from the menu. Bring a swimsuit, towel, biodegradable sunscreen, a cap, sunglasses and a photo ID.<br/><br/>
<b>We accept cards and cash.</b>`,
    includes: [
      {key: 'barra-libre', value: 'International open bar on board'},
      {key: 'drink', value: 'Welcome drink (with or without alcohol)'},
      {key: 'cerveza', value: 'Corona beer (250 ml)'},
      {key: 'snack', value: 'Seasonal welcome snack'},
      {key: 'comida', value: 'Lunch at Las Ánimas Beach, choose from 4 menu options'},
      {key: 'snorkel', value: 'Snorkel gear, paddle board, kayak and water inflatables'},
      {key: 'salvavidas', value: 'Life jackets'},
      {key: 'musica', value: 'Music'},
      {key: 'animacion', value: 'Entertainment on board'},
      {key: 'concursos', value: 'Games and contests on the way back'},
    ],
    notIncludes: [
      'Jet ski',
      'Banana boat ride',
      'Drinks at the beach',
      'Gratuity for the crew',
      'Transportation to the dock',
    ],
    itinerary: [
      {time: 'Maritime Terminal', text: 'Passenger check-in and boarding'},
      {
        time: 'Los Muertos Pier',
        text: 'Second boarding point, next to the beach\'s iconic pier and sail',
      },
      {
        time: 'Mismaloya Arches',
        text: 'Photo stop in front of this iconic natural landmark',
      },
      {
        time: 'Madagascar Beach',
        text: 'Water activities: snorkeling, paddle boarding, kayaking and water inflatables',
      },
      {
        time: 'Las Ánimas',
        text: 'Free time on the beach and lunch at the restaurant',
      },
      {
        time: 'Back to Puerto Mágico',
        text: 'Party on board with music, dancing, games and entertainment',
      },
    ],
    map: [
      {
        url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.4039406910156!2d-105.244695795991!3d20.653377123199686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8421404014358cb7%3A0xa452561255422540!2sVallarta%20WKND!5e0!3m2!1sen!2smx!4v1785870451402!5m2!1sen!2smx',
        description: 'Check-in at 11:30 am. We set sail at 12:00 pm.',
        place: 'Puerto Mágico',
        city: 'Puerto Vallarta',
        state: 'Jalisco',
        country: 'Mexico',
      },
      {
        url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.694793130182!2d-105.23936700000002!3d20.600517999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8421454b2f06f169%3A0x882ebcec1babc084!2sLos%20Muertos%20Beach%20Pier!5e0!3m2!1sen!2smx!4v1785868675967!5m2!1sen!2smx',
        description: 'Check-in at 12:00 pm. We set sail at 12:40 pm.',
        place: 'Los Muertos Pier',
        city: 'Puerto Vallarta',
        state: 'Jalisco',
        country: 'Mexico',
      },
    ],
  },
  {
    slug: 'adelita-yate-privado',
    name: 'Adelita Private Yacht',
    tagline: 'Spend your day in Las Ánimas, Majahuitas and the most beautiful beaches on the South Shore',
    duration: '4, 6 or 8 hours',
    schedule: 'Flexible schedule, set to fit your plans',
    boat: 'Yacht, 30 passengers',
    priceFrom: 12000,
    priceNote: 'for 4 hours',
    rate: 4.3,
    stars: '★★★★★',
    ratings: 25,
    description: `A private yacht where you set the mood: parties, bachelorette trips, birthdays and family celebrations out at sea, with the boat all to yourselves.<br/><br/>
You design your own route through the most iconic beaches in Banderas Bay and pick the departure time that works for you.<br/><br/>
<b>Charter options:</b><br/>4 hours for ${usd(12000)}<br/>6 hours for ${usd(15000)}<br/>8 hours for ${usd(18000)}<br/><br/>
Need more time? Each extra hour is ${usd(2500)}.<br/><br/>
You can bring your own food and drinks at no extra cost.<br/><br/>
<b>All-Inclusive Plan for an extra ${usd(500)} per person:</b><br/>
Domestic open bar with unlimited beer and snacks.<br/>
Confirm it at least 24 hours in advance, and you only pay for the people actually sailing.<br/><br/>
A 50% deposit is required to book. Cancellations are accepted up to 24 hours before departure. In bad weather the tour is rescheduled; refunds apply only when the authorities close the port.`,
    includes: [
      {key: 'barra-libre', value: 'Bottled water'},
      {key: 'hielos', value: 'Ice'},
      {key: 'cerveza', value: '24 beers of your choice'},
      {key: 'snorkel', value: 'Snorkel gear, paddle boards and a water inflatable'},
      {key: 'salvavidas', value: 'Life jackets'},
      {key: 'musica', value: 'Premium sound system'},
      {key: 'tripulacion', value: 'Professional captain and crew'},
      {key: 'seguro', value: 'Liability and passenger insurance'},
    ],
    notIncludes: [
      `Port fee of $35 MXN (about ${usd(35)}) per person, paid directly at the dock`,
      'Tips for the crew',
      'Hotel to dock transportation',
      'Food, unless you add the All-Inclusive Plan',
      'Drinks beyond the 24 beers included',
    ],
    itinerary: [
      {
        time: 'Booking',
        text: 'Pick your departure point, time and duration. A 50% deposit is required',
      },
      {
        time: '24h before',
        text: 'Confirm the All-Inclusive Plan if you want it, paying only for the people sailing',
      },
      {time: 'Tour day', text: 'Check-in and boarding. Water, ice and beers are waiting on board'},
      {
        time: 'On the water',
        text: 'Your own route through the beaches of Banderas Bay, with snorkeling, paddle boarding and the inflatable at every stop',
      },
      {
        time: 'Wrap-up',
        text: `Back to your departure point. If you need more time, each extra hour is ${usd(2500)}`,
      },
    ],
    map: [
      {
        url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.4039406910156!2d-105.244695795991!3d20.653377123199686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8421404014358cb7%3A0xa452561255422540!2sVallarta%20WKND!5e0!3m2!1sen!2smx!4v1785870451402!5m2!1sen!2smx',
        description: 'Vallarta WKND booth.',
        place: 'Puerto Mágico',
        city: 'Puerto Vallarta',
        state: 'Jalisco',
        country: 'Mexico',
      },
      {
        url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.694793130182!2d-105.23936700000002!3d20.600517999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8421454b2f06f169%3A0x882ebcec1babc084!2sLos%20Muertos%20Beach%20Pier!5e0!3m2!1sen!2smx!4v1785868675967!5m2!1sen!2smx',
        description: '',
        place: 'Los Muertos Pier',
        city: 'Puerto Vallarta',
        state: 'Jalisco',
        country: 'Mexico',
      },
    ],
  },
  {
    slug: 'vallarta-whale-watching',
    name: 'Vallarta Whale Watching',
    tagline: 'Your front-row seat to the ocean show.',
    duration: '3½ hours',
    schedule: 'Departures at 9:00 am and 1:00 pm. Season runs December 8 to March 20',
    boat: 'Catamaran, 150 passengers',
    priceFrom: 1600,
    priceNote: 'per person',
    rate: 4.3,
    stars: '★★★★★',
    ratings: 25,
    description: `Watch humpback whales in Banderas Bay aboard the Vallarta Sol, a two-deck catamaran with plenty of room to move around, sit comfortably and pick your angle on the show. We leave from Puerto Mágico and sail the bay following the whales' activity, with 3.5 hours on the water, a guide and a marine biologist on board, and a domestic open bar that opens the moment we clear the federal zone. The upper deck gives you an elevated view for photos, while the main deck offers shade and seating if you would rather take it easy.<br/><br/>
The season runs roughly from December 8 to March 20, subject to SEMARNAT authorization. There are two departures daily, at 9:00 am and 1:00 pm.<br/><br/>
It works for all ages and is especially good for large groups, whole families and companies: there is space, service on board and enough time to enjoy the sail itself on top of the whale watching. Kids 6 to 11 pay ${usd(800)}, kids 3 to 5 only cover a ${usd(200)} minimum consumption, and children under 3 go free. Traveling with a large group? Message us for a special rate.<br/><br/>
Practical tips: arrive at least 30 minutes before your departure time. Bring biodegradable sunscreen, a cap, sunglasses, a light layer for the wind and your camera.<br/><br/>
Whale watching happens in a natural habitat, so we cannot guarantee sightings on every departure. Cancellations are accepted up to 24 hours before departure. In bad weather the tour is rescheduled; refunds apply only when the authorities close the port.`,
    includes: [
      {
        key: 'buffet',
        value: 'Turkey breast focaccia with a touch of stracciatella, pistachio cream and fresh vegetables, plus a granola bar station',
      },
      {
        key: 'drink',
        value: 'Domestic open bar: Corona beer (250 ml), rum, vodka, whiskey and tequila. Juice, coffee and soft drinks too',
      },
      {key: 'salvavidas', value: 'Life jackets and safety equipment on board'},
      {key: 'guia', value: 'Guide and marine biologist on board the whole trip'},
    ],
    notIncludes: [
      `Port fee of $35 MXN (about ${usd(35)}) per person, paid directly at the dock`,
      'Tips for the crew',
      'Hotel to dock transportation',
      'Premium or imported drinks',
    ],
    itinerary: [
      {time: '8:30 am / 12:30 pm', text: 'Check-in at Puerto Mágico'},
      {time: '9:00 am / 1:00 pm', text: 'We set sail aboard the Vallarta Sol'},
      {time: 'Once past the federal zone', text: 'The domestic open bar opens'},
      {
        time: 'During the trip',
        text: 'Sailing Banderas Bay with a guide and marine biologist on board, and two decks to choose your viewing spot',
      },
      {time: 'On board', text: 'Focaccia service and granola bar station'},
      {time: '12:30 pm / 4:30 pm', text: 'Back at Puerto Mágico'},
    ],
    map: [
      {
        url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.4039406910156!2d-105.244695795991!3d20.653377123199686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8421404014358cb7%3A0xa452561255422540!2sVallarta%20WKND!5e0!3m2!1sen!2smx!4v1785870451402!5m2!1sen!2smx',
        description: 'Vallarta WKND booth.',
        place: 'Puerto Mágico',
        city: 'Puerto Vallarta',
        state: 'Jalisco',
        country: 'Mexico',
      },
      {
        url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.694793130182!2d-105.23936700000002!3d20.600517999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8421454b2f06f169%3A0x882ebcec1babc084!2sLos%20Muertos%20Beach%20Pier!5e0!3m2!1sen!2smx!4v1785868675967!5m2!1sen!2smx',
        description: '',
        place: 'Los Muertos Pier',
        city: 'Puerto Vallarta',
        state: 'Jalisco',
        country: 'Mexico',
      },
    ],
  },
];
