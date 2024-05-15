import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const res = await fetch(`${process.env.API_URL}/export/tile`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
}
