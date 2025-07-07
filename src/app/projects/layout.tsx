import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function layout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) redirect("/sign-in");

    return (
        <div className='bg-[#111113] p-6 w-screen h-screen overflow-hidden'>
            {children}
        </div>
    );
}