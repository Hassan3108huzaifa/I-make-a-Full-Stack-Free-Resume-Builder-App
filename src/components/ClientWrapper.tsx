'use client';

import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    NProgress.configure({ showSpinner: false, speed: 500 });

    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    handleStart();
    handleStop();

    return () => {
      handleStop();
    };
  }, [pathname, searchParams, isMounted]);

  if (!isMounted) {
    return null;
  }

  return <SessionProvider>{children}</SessionProvider>;
};