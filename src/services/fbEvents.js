import { getCookie } from 'cookies-next';

export default function fbEvent(
  eventName,
  userData = {
    phone: '',
    email: '',
    externalID: '',
  },
  eventID = Date.now(),
) {
  const payload = JSON.stringify({
    eventName,
    eventID,
    user: {
      ph: userData.phone || '',
      em: userData.email || '',
      externalID: userData.externalID,
    },
  });

  fbq('track', eventName, {fbc: getCookie('_fbc'), eventID: eventID});

  return fetch(`/api/fb-event`, {
    method: 'POST',
    body: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch(err => console.log(err));
}