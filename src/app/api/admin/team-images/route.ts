import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public', 'images', 'team');
    const files = await fs.promises.readdir(publicDir);
    // Filter common image extensions
    const images = files.filter((f) => /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(f)).map((f) => `/images/team/${f}`);
    return NextResponse.json({ success: true, images });
  } catch (err) {
    return NextResponse.json({ success: false, images: [], error: (err as Error).message });
  }
}
