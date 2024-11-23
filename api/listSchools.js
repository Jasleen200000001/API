import { listSchools } from '../src/controllers/schoolController';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return listSchools(req, res);
  }
  res.status(405).json({ message: 'Method Not Allowed' });
}
