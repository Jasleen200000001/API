import { addSchool } from '../src/controllers/schoolController';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return addSchool(req, res);
  }
  res.status(405).json({ message: 'Method Not Allowed' });
}
