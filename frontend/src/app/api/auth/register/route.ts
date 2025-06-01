import { NextResponse } from 'next/server';
import apiClient from '@/lib/api-client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Pass the registration request to the backend API
    await apiClient.post('/auth/register', { username, email, password });

    return NextResponse.json({ message: 'Registration successful' });
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Forward error from backend if available
    const errorMessage = error?.response?.data?.message || 'Registration failed';
    const statusCode = error?.response?.status || 500;
    
    return NextResponse.json({ message: errorMessage }, { status: statusCode });
  }
}
