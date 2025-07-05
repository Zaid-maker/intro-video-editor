import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ensureDemoUser, DEMO_USER_ID } from "./demo-user";

export async function getCurrentUser() {
  try {
    console.log('Getting current user session...');
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    console.log('Session result:', session ? 'Found session' : 'No session');
    return session?.user || null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function getCurrentUserId(): Promise<string | null> {
  const user = await getCurrentUser();
  
  // Fallback for development/testing - ensure demo user exists
  if (!user?.id && process.env.NODE_ENV === 'development') {
    console.warn('No authenticated user found, ensuring demo user exists for development');
    await ensureDemoUser();
    return DEMO_USER_ID;
  }
  
  return user?.id || null;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Authentication required. Please sign in to continue.');
  }
  return user;
}

export async function requireUserId(): Promise<string> {
  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error('Authentication required. Please sign in to continue.');
  }
  return userId;
}
