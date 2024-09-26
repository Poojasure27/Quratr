import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Ensure you have a directory to save uploaded images
const uploadDir = path.join(process.cwd(), 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  // Create a unique filename
  const filePath = path.join(uploadDir, file.name);
  
  // Save the file to the server
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  // Return the URL to access the uploaded image
  return NextResponse.json({ imageUrl: `/uploads/${file.name}` }, { status: 201 });
}
