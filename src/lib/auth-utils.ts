import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getCurrentUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    return session?.user || null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function getCurrentUserId(): Promise<string | null> {
  const user = await getCurrentUser();
  
  // Fallback for development/testing - remove in production
  if (!user?.id && process.env.NODE_ENV === 'development') {
    console.warn('No authenticated user found, using demo user for development');
    return 'demo-user-id';
  }
  
  return user?.id || null;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}
