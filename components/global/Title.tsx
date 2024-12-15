import { cn } from '@/lib/utils';
import React from 'react';

function Title({ label, className="mb-12" }: { label: string; className?: string }) {
  // Splitting the label into words
  const txt = label.split(" ");
  const lastText = txt.at(-1); // Getting the last word
  const others = txt.slice(0, -1).join(" "); // Joining all words except the last one

  return (
    <h1 className={cn(`text-3xl font-bold  text-primary-light`, className)}>
      {others} <span className="text-primary">{lastText}</span>
    </h1>
  );
}

export default Title;
