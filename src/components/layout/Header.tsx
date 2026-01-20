'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Menu, Scale, Contrast } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

export default function Header() {
  const { isLargeText, toggleLargeText, isHighContrast, toggleHighContrast } = useAccessibility();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block font-headline">Suvidha Sahayak</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Accessibility</SheetTitle>
              </SheetHeader>
              <div className="grid gap-6 py-4">
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

          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
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
        </div>
      </div>
    </header>
  );
}
