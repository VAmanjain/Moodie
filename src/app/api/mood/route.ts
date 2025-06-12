import { NextRequest, NextResponse } from 'next/server';
import { addMood, getMoods } from '@/app/api/utils/moods';

export async function GET() {
  try {
    const moods = getMoods();
    return NextResponse.json(moods);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch moods' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employeeName, employeeId, mood, customMood, comment } = body;

    // Validation
    if (!employeeName || !employeeId) {
      return NextResponse.json(
        { error: 'Employee name and ID are required' },
        { status: 400 }
      );
    }

    if (!mood || !['happy', 'neutral', 'sad', 'custom'].includes(mood)) {
      return NextResponse.json(
        { error: 'Invalid mood value' },
        { status: 400 }
      );
    }

    if (mood === 'custom' && (!customMood?.emoji || !customMood?.label)) {
      return NextResponse.json(
        { error: 'Custom mood emoji and label are required' },
        { status: 400 }
      );
    }

    const newMood = addMood({ 
      employeeName, 
      employeeId, 
      mood, 
      customMood: mood === 'custom' ? customMood : undefined,
      comment 
    });
    
    return NextResponse.json(newMood, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create mood entry' },
      { status: 500 }
    );
  }
}
