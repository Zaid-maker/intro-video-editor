import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

interface LayoutProps {
  children: React.ReactNode;
}

export default async function layout({ children }: LayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  return (
    <div className='bg-[#111113]  p-6'>
      {children}
    </div>
  )
}
