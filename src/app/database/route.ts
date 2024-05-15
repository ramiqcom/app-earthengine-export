import { NextResponse } from 'next/server';
import getDatabase from '../../module/getDatabase';

export async function GET() {
  try {
    return NextResponse.json(await getDatabase(), { status: 200 });
  } catch ({ message }) {
    return NextResponse.json({ message }, { status: 404 });
  }
}
