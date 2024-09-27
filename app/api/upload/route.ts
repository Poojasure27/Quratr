import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// saving to public-->uploads
const uploadDir = path.join(process.cwd(), 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  
  const filePath = path.join(uploadDir, file.name);
  

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  // Return the URL to access the uploaded image
  return NextResponse.json({ imageUrl: `/uploads/${file.name}` }, { status: 201 });
}
