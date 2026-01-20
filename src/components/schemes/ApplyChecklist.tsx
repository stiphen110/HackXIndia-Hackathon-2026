"use client";

import type { Scheme } from '@/lib/types';
import Icon from '@/lib/icons';
import { Button } from '../ui/button';
import Link from 'next/link';

type ApplyChecklistProps = {
  scheme: Scheme;
};

export default function ApplyChecklist({ scheme }: ApplyChecklistProps) {
    
  const handlePrint = () => {
    window.print();
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3 text-lg font-headline">1. Required Documents</h3>
        <ul className="space-y-3">
          {scheme.documents.map(doc => (
            <li key={doc.name} className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                <Icon name={doc.icon} className="h-5 w-5" />
              </div>
              <span>{doc.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-lg font-headline">2. Application Steps</h3>
        <ul className="space-y-4">
          {scheme.applyMethod.map((method, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 text-accent-foreground flex items-center justify-center mr-3">
                <Icon name={method.icon} className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{method.type}</p>
                <p className="text-sm text-muted-foreground">{method.details}</p>
                {method.link && (
                    <Button variant="link" asChild className="p-0 h-auto mt-1">
                        <Link href={method.link} target="_blank" rel="noopener noreferrer">
                            Go to Portal
                        </Link>
                    </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Button onClick={handlePrint} variant="outline" className="w-full mt-4">Print Checklist</Button>
    </div>
  );
}
