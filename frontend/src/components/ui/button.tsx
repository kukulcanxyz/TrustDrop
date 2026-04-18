import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-stone-900 text-stone-50 hover:bg-stone-800',
        secondary: 'bg-[var(--surface-2)] text-[var(--ink)] hover:bg-[var(--surface-3)]',
        outline: 'border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--surface-2)]',
        ghost: 'text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]',
        success: 'bg-[#6f7c62] text-stone-50 hover:opacity-90',
        danger: 'bg-[#8b4b4b] text-stone-50 hover:opacity-90',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-lg px-3',
        lg: 'h-11 rounded-xl px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
