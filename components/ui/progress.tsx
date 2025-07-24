'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, ...props }, ref) => {
    const clampedValue = Math.min(Math.max(value, 0), max);
    const percent = (clampedValue / max) * 100;

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full h-4 rounded-full bg-gray-200 overflow-hidden',
          className
        )}
        {...props}
      >
        <div
          className="absolute left-0 top-0 h-full bg-blue-600 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };
