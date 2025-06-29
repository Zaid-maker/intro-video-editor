import IntroClient from './IntroClient';

// Server-side configuration
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function IntroPage() {
  return <IntroClient />;
}
