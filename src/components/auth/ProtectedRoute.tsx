'use client';

import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push(`/login?redirect=${pathname}`);
    }
  }, [user, isUserLoading, router, pathname]);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-100px)] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className='sr-only'>Loading...</span>
      </div>
    );
  }

  return <>{children}</>;
}
