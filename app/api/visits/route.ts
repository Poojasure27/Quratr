import { NextRequest, NextResponse } from 'next/server';

// Sample data for visits
let visits = [
  {
    id: '1',
    restaurantName: 'Tasty Bites',
    userName: 'John Doe',
    date: '2024-09-26',
    rating: 4,
    review: 'Great food and atmosphere!',
    imageUrl: '/api/placeholder/400/300', // Placeholder image
  },
];

// Handle GET requests
export async function GET() {
  return NextResponse.json(visits);
}

// Handle POST requests
export async function POST(request: NextRequest) {
  const formData = await request.formData(); // Parse multipart/form-data

  // Create a new visit object
  const newVisit = {
    id: Date.now().toString(),
    restaurantName: formData.get('restaurantName'),
    userName: 'John Doe', // Replace with actual user data as needed
    date: formData.get('date'),
    rating: parseInt(formData.get('rating') as string, 10), // Convert rating to number
    review: formData.get('review'),
    imageUrl: '', // Placeholder for the image URL
  };

  // Handle file upload
  const imageFile = formData.get('image') as File;
  if (imageFile) {
    // Assuming you're storing images on your server
    const imageUrl = await uploadImage(imageFile); // Function to handle image upload
    newVisit.imageUrl = imageUrl; // Set the image URL in the new visit object
  }

  visits.push(newVisit); // Add the new visit to the visits array
  return NextResponse.json(newVisit, { status: 201 });
}

// Mock function to simulate image upload (replace with actual upload logic)
async function uploadImage(file: File): Promise<string> {
  // In a real application, you might upload to cloud storage and return the URL
  return `/uploads/${file.name}`; // Example URL (update with actual logic)
}
