'use client';

import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Explicitly declare searchParams type
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Initialize NProgress
    NProgress.configure({ showSpinner: false, speed: 500 });
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    handleStart();
    handleStop();

    return () => {
      handleStop();
    };
  }, [pathname, isMounted]);

  // Get search params on mount
  useEffect(() => {
    if (isMounted) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      setSearchParams(urlSearchParams);
    }
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};
