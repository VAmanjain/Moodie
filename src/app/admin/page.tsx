'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoodEntry } from '@/app/api/utils/moods';
import { Damion } from 'next/font/google';


const damion = Damion({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-damion",
});

const moodEmojis = {
  happy: '😀',
  neutral: '😐',
  sad: '🙁',
  custom: '🎨', 
};

export default function AdminPage() {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await fetch('/api/mood');
        if (response.ok) {
          const data = await response.json();
          setMoods(data);
        }
      } catch (error) {
        console.error('Error fetching moods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100  p-8 py-30 ">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className={"text-4xl font-bold text-teal-600" + ` ${damion.className} `}>Admin Dashboard</CardTitle>
            <CardDescription>
              View all employee mood entries ({moods.length} total)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {moods.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No mood entries yet. Encourage employees to submit their moods!
              </div>
            ) : (
              <Table>
                <TableHeader className='bg-gray-100 font-bold'>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Mood</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Submitted At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {moods.map((mood) => (
                    <TableRow key={mood.id}>
                      <TableCell>
                        {mood.employeeId}
                      </TableCell>
                      <TableCell className="font-medium">
                        {mood.employeeName}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">
                            {mood.mood === 'custom' ? mood.customMood?.emoji : moodEmojis[mood.mood]}
                          </span>
                          <span className="capitalize font-medium">
                            {mood.mood === 'custom' ? mood.customMood?.label : mood.mood}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {mood.comment || <span className="text-gray-400">No comment</span>}
                      </TableCell>
                      <TableCell>{formatDate(mood.timestamp.toString())}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
