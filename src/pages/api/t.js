export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    console.log('[SG]', req.body);
  } catch (e) {
    console.log('[SG_ERR]', String(e));
  }

  return res.status(204).end();
}