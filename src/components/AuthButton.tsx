'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FaRegCircleUser } from 'react-icons/fa6';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

interface AuthButtonProps {
  isMobile?: boolean;
}

export default function AuthButton({ isMobile = false }: AuthButtonProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = async (href: string) => {
    setIsOpen(false);
    if (href === `/${session?.user.id}`) {
      setIsLoading(true);
      try {
        router.push(href);
      } finally {
        // Set loading to false after navigation
        setIsLoading(false);
      }
    } else {
      router.push(href);
    }
  };

  if (isLoading && isMobile) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${isMobile ? 'w-full flex-col space-y-2' : 'space-x-4'}`}>
      {isMobile && (
        <Button
          className="w-full bg-sky-500 hover:bg-sky-600 text-white"
          onClick={() => handleNavigation('/builder')}
        >
          Create Resume
        </Button>
      )}
      {session && session.user ? (
        <>
          {!isMobile && (
            <Button
              className="h-9 bg-sky-500 hover:bg-sky-600 text-white"
              onClick={() => handleNavigation('/builder')}
            >
              Create Resume
            </Button>
          )}
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={`p-0 h-12 rounded-full ${isMobile ? 'w-full justify-center' : 'w-12'}`}
              >
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-sky-500" />
                ) : session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <FaRegCircleUser style={{ width: '30px', height: '30px' }} className="text-gray-500" />
                )}
                {isMobile && <span className="font-medium ml-2">{session.user.name}</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onSelect={() => handleNavigation(`/${session.user.id}`)}>
                Your Resumes
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  setIsOpen(false);
                  signOut();
                }}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          {!isMobile && (
            <Button
              className="h-9 bg-sky-500 hover:bg-sky-600 text-white"
              onClick={() => handleNavigation('/builder')}
            >
              Create Resume
            </Button>
          )}
          <Button
            className={`h-9 ${isMobile ? 'w-full' : ''}`}
            variant="outline"
            onClick={() => handleNavigation('/signin')}
          >
            Sign in
          </Button>
        </>
      )}
    </div>
  );
}

