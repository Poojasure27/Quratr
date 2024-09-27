import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const restaurantName = formData.get('restaurantName') as string;
    const date = formData.get('date') as string;
    const rating = formData.get('rating') as string;
    const review = formData.get('review') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Creating file name
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileExtension = file.name.split('.').pop();
    const filename = `${uniqueSuffix}.${fileExtension}`;

    // saving
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const path = join(uploadDir, filename);
    await writeFile(path, buffer);

    // Create a new visit object
    const newVisit = {
      id: uniqueSuffix,
      restaurantName,
      userName: 'Pooja', 
      date,
      rating: parseInt(rating),
      review,
      imageUrl: `/uploads/${filename}`,
    };

    // Here you would typically save the newVisit object to your database
    // For this example, we'll just return it

    return NextResponse.json(newVisit, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/visits:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}