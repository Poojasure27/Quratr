import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const shareData = await request.json();
  console.log('Sharing visit:', shareData);
  return NextResponse.json({ message: 'Shared successfully!' });
}
