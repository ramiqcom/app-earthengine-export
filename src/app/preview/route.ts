import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const res = await fetch(`${process.env.API_URL}/view`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
}
