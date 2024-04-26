import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const res = await fetch(`${process.env.API}/view`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();
  return NextResponse.json(json, { status: 200 });
}
