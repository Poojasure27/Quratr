// app/questions/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // For Next.js 13, use `next/navigation`

type Preferences = Record<number, number>;

const Questionnaire: React.FC = () => {
  const [preferences, setPreferences] = useState<Preferences>({});
  const router = useRouter();

  const questions: string[] = [
    "You’re more of a club kinda person than a Starbucks kinda person?",
    "You’re the 'I live for experiences and am ready to spend for premium experiences' kinds?",
    "You’re the 'omnivore but going out with friends is more my thing' kinds?",
    "You’re the 'I just want to sit alone and do nothing or some work on my laptop' kinds?",
    "You were in the queue to get Coldplay tickets right?",
    "You feel blue Tokai > Bohca any day?",
    "You’re the Gurgaon types?",
    "You’re the 'I go out to South/Central Delhi' kinds",
    "You die to get hidden gems in and around NCR—'always out of home on weekends' kinds",
    "You’re adventurous and want to do new things with new people",
  ];

  const handleAnswer = (index: number, answer: boolean) => {
    setPreferences((prev) => ({ ...prev, [index]: answer ? 1 : 0 }));
  };

  const handleSubmit = async () => {
    // Save preferences to the server (if necessary) or use directly for client-side logic
    await fetch('/api/savePreferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferences }),
    });

    // Navigate to the Restaurants page
    router.push('/Restaurants');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000] py-8 px-4">
      <div className="bg-[#fff] p-6 rounded-lg shadow-lg max-w-lg w-full border-4 border-[#000]">
        <h1 className="text-2xl font-bold text-[#000] mb-6 text-center">
          Let's Discover Your Vibe!
        </h1>
        {questions.map((question, index) => (
          <div key={index} className="mb-6">
            <p className="text-[#000] text-lg mb-4 text-center">{question}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleAnswer(index, true)}
                className="bg-gradient-to-r from-[#333] to-[#000] text-[#fed4e4] py-2 px-6 border border-[#fff] rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
              >
                Yes
              </button>
              <button
                onClick={() => handleAnswer(index, false)}
                className="bg-gradient-to-r from-[#fed4e4] to-[#f5b9c2] text-[#000] py-2 px-6 border border-[#000] rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
              >
                No
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-gradient-to-r from-[#333] to-[#000] text-[#fed4e4] py-3 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
