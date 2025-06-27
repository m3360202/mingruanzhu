import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  
  if (!['GET', 'POST', 'PUT'].includes(method || '')) {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    const falKey = process.env.FAL_KEY || process.env.NEXT_PUBLIC_FAL_KEY;
    if (!falKey) {
      return res.status(500).json({ error: 'FAL_KEY not configured' });
    }

    const response = await fetch('https://fal.run/fal-ai/ffmpeg-api/waveform', {
      method: method as string,
      headers: {
        'Authorization': `Bearer ${falKey}`,
        'Content-Type': 'application/json',
        ...req.headers as Record<string, string>
      },
      body: method !== 'GET' ? JSON.stringify(req.body) : undefined
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('FAL API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 