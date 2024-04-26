import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url, format } = await req.json();
    const res = await fetch(url);
    const file = await res.arrayBuffer();
    const string = Buffer.from(file).toString('base64');
    return NextResponse.json({ string }, { status: 200 });
  } catch ({ message }) {
    return NextResponse.json({ message }, { status: 404 });
  }
}
