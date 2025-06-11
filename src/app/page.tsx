import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent');

  const isMobile = /Mobi|Android|iPhone/i.test(userAgent || '');

  if (isMobile) {
    redirect('/mobile');
  } else {
    redirect('/desktop');
  }
}
