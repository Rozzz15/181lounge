'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[#8B0000] text-white hover:bg-[#6B0000] hover:scale-[1.02] active:scale-[0.98]',
        secondary: 'bg-[#C79A5D] text-white hover:bg-[#B08A4D] hover:scale-[1.02] active:scale-[0.98]',
        accent: 'bg-[#F6B042] text-[#222222] hover:bg-[#E5A032] hover:scale-[1.02] active:scale-[0.98]',
        outline: 'border-2 border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white',
        ghost: 'text-[#8B0000] hover:bg-[#8B0000]/10',
        dark: 'bg-[#222222] text-white hover:bg-[#333333] hover:scale-[1.02] active:scale-[0.98]',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
