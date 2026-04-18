import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink)]',
        success: 'border-[#b7c4ab] bg-[#e6edde] text-[#4f5a45]',
        warning: 'border-[#d8c29f] bg-[#f1e5cf] text-[#8a6a3f]',
        danger: 'border-[#d7b2b2] bg-[#f4e1e1] text-[#8b4b4b]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
