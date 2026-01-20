'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Menu, Scale, Contrast, User as UserIcon, LogOut } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useUser, useAuth } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { signOut } from 'firebase/auth';
import { Skeleton } from '@/components/ui/skeleton';

function UserNav() {
    const { user, isUserLoading } = useUser();
    const auth = useAuth();

    if (isUserLoading) {
        return <Skeleton className="h-8 w-24" />;
    }

    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                    <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                    <Link href="/register">Register</Link>
                </Button>
            </div>
        );
    }
    
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>
                            <UserIcon className="h-5 w-5" />
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.displayName || 'User'}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


export default function Header() {
  const {
    isLargeText,
    toggleLargeText,
    isHighContrast,
    toggleHighContrast,
  } = useAccessibility();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-auto flex items-center">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2"
          >
            <span className="font-bold sm:inline-block font-headline">
              Suvidha Sahayak
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                <div className="flex items-center space-x-2">
                    <Label htmlFor="large-text-desktop" className="flex items-center gap-1 cursor-pointer">
                    <Scale className="h-4 w-4" />
                    Large Text
                    </Label>
                    <Switch id="large-text-desktop" checked={isLargeText} onCheckedChange={toggleLargeText} />
                </div>
                <div className="flex items-center space-x-2">
                    <Label htmlFor="high-contrast-desktop" className="flex items-center gap-1 cursor-pointer">
                    <Contrast className="h-4 w-4" />
                    High Contrast
                    </Label>
                    <Switch id="high-contrast-desktop" checked={isHighContrast} onCheckedChange={toggleHighContrast} />
                </div>
            </nav>

            <div className="hidden md:flex">
                <UserNav />
            </div>

            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="grid gap-6 py-4">
                    <div className="flex md:hidden justify-center">
                        <UserNav />
                    </div>
                    <div className="flex items-center justify-between">
                    <Label htmlFor="large-text-mobile" className="flex items-center gap-2">
                        <Scale className="h-5 w-5" />
                        Large Text
                    </Label>
                    <Switch id="large-text-mobile" checked={isLargeText} onCheckedChange={toggleLargeText} />
                    </div>
                    <div className="flex items-center justify-between">
                    <Label htmlFor="high-contrast-mobile" className="flex items-center gap-2">
                        <Contrast className="h-5 w-5" />
                        High Contrast
                    </Label>
                    <Switch id="high-contrast-mobile" checked={isHighContrast} onCheckedChange={toggleHighContrast} />
                    </div>
                </div>
                </SheetContent>
            </Sheet>
        </div>

      </div>
    </header>
  );
}
