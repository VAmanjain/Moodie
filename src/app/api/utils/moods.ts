export interface MoodEntry {
  id: string;
  employeeName: string;
  employeeId: string;
  mood: 'happy' | 'neutral' | 'sad' | 'custom';
  customMood?: {
    emoji: string;
    label: string;
  };
  comment?: string;
  timestamp: Date;
}

export const moods: MoodEntry[] = [];

export function addMood(mood: Omit<MoodEntry, 'id' | 'timestamp'>): MoodEntry {
  const newMood: MoodEntry = {
    id: Date.now().toString(),
    ...mood,
    timestamp: new Date(),
  };
  moods.push(newMood);
  return newMood;
}

export function getMoods(): MoodEntry[] {
  return moods.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}
