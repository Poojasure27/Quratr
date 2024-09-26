"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Card } from '../../components/ui/card/card';
import { CardHeader } from '../../components/ui/card/cardHeader';
import { CardContent } from '../../components/ui/card/cardContent';
import { CardFooter } from '../../components/ui/card/CardFooter';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Share2 } from 'lucide-react';
import { Alert } from '../../components/ui/alert'; // Ensure props are correctly defined for this component

interface Visit {
  id: string;
  restaurantName: string;
  userName: string;
  date: string;
  rating: number;
  review: string;
  imageUrl: string;
}

const RestaurantFeed: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [newVisit, setNewVisit] = useState<Partial<Visit>>({});
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // State for the selected image
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/visits'); // Replace with your actual API endpoint
      setVisits(response.data);
    } catch (err) {
      setError('Failed to fetch visits. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewVisit({ ...newVisit, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]); // Set the selected image
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(); // Create a FormData object for file upload
    formData.append('restaurantName', newVisit.restaurantName as string);
    formData.append('date', newVisit.date as string);
    formData.append('rating', (newVisit.rating as number).toString());
    formData.append('review', newVisit.review as string);
    if (selectedImage) {
      formData.append('image', selectedImage); // Append the selected image
    }

    try {
      const response = await axios.post('/api/visits', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the appropriate header for file upload
        },
      }); // Replace with your actual API endpoint
      setSuccessMessage('Your visit has been added successfully!');
      setVisits([...visits, response.data]);
      setShowForm(false);
      setNewVisit({});
      setSelectedImage(null); // Clear selected image after submission
    } catch (err) {
      setError('Failed to submit your visit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const shareOnInstagram = async (visit: Visit) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.post('/api/share', { visitId: visit.id }); // Add the selected image to the request if needed
      setSuccessMessage('Your visit has been shared on Instagram!');
    } catch (err) {
      setError('Failed to share on Instagram. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000] text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-[#fed4e4]">Feed</h1>

      {error && (
        <Alert className="mb-4">
          <h2 className="font-semibold">Error</h2>
          <p>{error}</p>
        </Alert>
      )}

      {successMessage && (
        <Alert className="mb-4">
          <h2 className="font-semibold">Success</h2>
          <p>{successMessage}</p>
        </Alert>
      )}

      <Button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-[#fed4e4] text-black hover:bg-[#fca5c3]"
        disabled={isLoading}
      >
        {showForm ? 'Cancel' : 'Add New Visit'}
      </Button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <Input
            name="restaurantName"
            placeholder="Restaurant Name"
            onChange={handleInputChange}
            className="bg-gray-800 text-white"
            required
          />
          <Input
            name="date"
            type="date"
            onChange={handleInputChange}
            className="bg-gray-800 text-white"
            required
          />
          <Input
            name="rating"
            type="number"
            min="1"
            max="5"
            placeholder="Rating (1-5)"
            onChange={handleInputChange}
            className="bg-gray-800 text-white"
            required
          />
          <Textarea
            name="review"
            placeholder="Your review"
            onChange={handleInputChange}
            className="bg-gray-800 text-white"
            required
          />
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-gray-800 text-white"
            required
          />
          <Button
            type="submit"
            className="bg-[#fed4e4] text-black hover:bg-[#fca5c3]"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Visit'}
          </Button>
        </form>
      )}

      {isLoading && <p>Loading...</p>}

      <div className="space-y-6">
        {visits.map((visit) => (
          <Card key={visit.id} className="bg-gray-800 text-white">
            <CardHeader>
              <h2 className="text-xl font-semibold text-[#fed4e4]">{visit.restaurantName}</h2>
              <p className="text-sm text-gray-400">
                Visited by {visit.userName} on {visit.date}
              </p>
            </CardHeader>
            <CardContent>
              <Image
                src={visit.imageUrl}
                alt={visit.restaurantName}
                width={400}
                height={300}
                className="rounded-md mb-4"
              />
              <p className="mb-2">Rating: {visit.rating}/5</p>
              <p>{visit.review}</p>
            </CardContent>
            <CardFooter className="justify-end">
              <Button
                onClick={() => shareOnInstagram(visit)}
                className="bg-[#fed4e4] text-black hover:bg-[#fca5c3]"
                disabled={isLoading}
              >
                <Share2 className="mr-2 h-4 w-4" /> Share on Instagram
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RestaurantFeed;
