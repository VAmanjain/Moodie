'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Damion } from 'next/font/google';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const moodOptions = [
  { value: 'happy', emoji: '😀', label: 'Happy' },
  { value: 'neutral', emoji: '😐', label: 'Neutral' },
  { value: 'sad', emoji: '🙁', label: 'Sad' },
  { value: 'custom', emoji: '✨', label: 'Other' },
];

const damion = Damion({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-damion',
});
export default function MoodPage() {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [customMoodLabel, setCustomMoodLabel] = useState('');
  const [customMoodEmoji, setCustomMoodEmoji] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    if (mood !== 'custom') {
      setShowEmojiPicker(false);
      setCustomMoodLabel('');
      setCustomMoodEmoji('');
    } else {
      setShowEmojiPicker(false); 
    }
  };

  const handleEmojiClick = (emojiData: { emoji: string; }) => {
    setCustomMoodEmoji(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood || !employeeName.trim() || !employeeId.trim()) return;
    
    if (selectedMood === 'custom' && (!customMoodEmoji || !customMoodLabel.trim())) {
      alert('Please select an emoji and enter a label for your custom mood');
      return;
    }

    setIsSubmitting(true);
    try {
      type Payload = {
        employeeName: string;
        employeeId: string;
        mood: string;
        comment?: string;
        customMood?: {
          emoji: string;
          label: string;
        };
      };

      const payload: Payload = {
        employeeName: employeeName.trim(),
        employeeId: employeeId.trim(),
        mood: selectedMood,
        comment: comment.trim() || undefined,
      };

      if (selectedMood === 'custom') {
        payload.customMood = {
          emoji: customMoodEmoji,
          label: customMoodLabel.trim(),
        };
      }

      const response = await fetch('/api/mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to submit mood');
      }
    } catch (error) {
      console.error('Error submitting mood:', error);
      alert('Error submitting mood. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 pt-30">
      <Card className="w-full max-w-2xl gap-6">
        <CardHeader className="text-center gap-6">
          <CardTitle className={"text-4xl font-bold text-teal-600" + ` ${damion.className} `}>Let us know how you are feeling?</CardTitle>
          <CardDescription>
            Enter your details and select your current mood
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Employee Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeName">Employee Name *</Label>
                <Input
                  id="employeeName"
                  type="text"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID *</Label>
                <Input
                  id="employeeId"
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="Enter your employee ID"
                  required
                />
              </div>
            </div>

            {/* Mood Selection */}
            <div className="space-y-4">
              <Label>Select your mood *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {moodOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleMoodSelect(option.value)}
                    className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                      selectedMood === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-4xl mb-2">{option.emoji}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Mood Input */}
            {selectedMood === 'custom' && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <Label>Customize your mood</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customEmoji">Select Emoji *</Label>
                    <div className="relative">
                      <Input
                        id="customEmoji"
                        type="text"
                        value={customMoodEmoji}
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        placeholder="Click to select emoji"
                        readOnly
                        className="cursor-pointer"
                        required
                      />
                      {showEmojiPicker && (
                        <div className="absolute top-full left-0 z-50 mt-2">
                          <EmojiPicker
                            onEmojiClick={handleEmojiClick}
                            width={300}
                            height={400}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customLabel">Mood Label *</Label>
                    <Input
                      id="customLabel"
                      type="text"
                      value={customMoodLabel}
                      onChange={(e) => setCustomMoodLabel(e.target.value)}
                      placeholder="e.g., Excited, Tired, Focused"
                      required
                    />
                  </div>
                </div>
                {customMoodEmoji && customMoodLabel && (
                  <div className="flex items-center space-x-2 p-2 bg-white rounded border">
                    <span className="text-2xl">{customMoodEmoji}</span>
                    <span className="font-medium">{customMoodLabel}</span>
                  </div>
                )}
              </div>
            )}

            {/* Comment */}
            <div className="space-y-2">
              <Label htmlFor="comment">Comment (optional)</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us more about how you're feeling..."
                className="resize-none"
                rows={3}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-600 --font-damion"
              disabled={!selectedMood || !employeeName.trim() || !employeeId.trim() || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Mood'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {showEmojiPicker && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowEmojiPicker(false)}
        />
      )}
    </div>
  );
}
