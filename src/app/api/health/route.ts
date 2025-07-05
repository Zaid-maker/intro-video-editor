import { NextResponse } from 'next/server';
import { db } from '@/db';
import { getCurrentUserId, requireUserId } from '@/lib/auth-utils';

export async function GET() {
  try {
    // Test database connection
    const result = await db.execute('SELECT 1 as test');
    
    // Test auth
    const userId = await getCurrentUserId();
    const authStatus = userId ? 'authenticated' : 'not authenticated';
    
    return NextResponse.json({
      type: 'success',
      data: {
        database: 'connected',
        auth: authStatus,
        userId: userId || null,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { 
        type: 'error', 
        message: `Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
      },
      { status: 500 }
    );
  }
}

// Test authentication requirement
export async function POST() {
  try {
    const userId = await requireUserId();
    
    return NextResponse.json({
      type: 'success',
      data: {
        message: 'Authentication successful',
        userId,
      },
    });
  } catch (error) {
    console.error('Auth test failed:', error);
    return NextResponse.json(
      { 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 401 }
    );
  }
}
