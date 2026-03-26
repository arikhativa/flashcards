import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react-native';

import { Badge } from '@/components/ui/badge';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Typography } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const hoverIconButtonVariants = cva(
  'aspect-square w-12 rounded-full shadow-md transition-opacity duration-200',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'dark:bg-destructive',
        outline: 'dark:bg-input dark:active:bg-input/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type Props = Omit<ButtonProps, 'variant'> &
  VariantProps<typeof hoverIconButtonVariants> & {
    icon: LucideIcon;
    badgeValue?: string | number;
  };

export default function HoverIconButton({
  icon,
  badgeValue,
  variant = 'default',
  className,
  ...props
}: Props) {
  const hasBadge = !!(badgeValue !== undefined && badgeValue !== null && badgeValue !== '');

  return (
    <Button
      {...props}
      variant={variant}
      className={cn(
        hoverIconButtonVariants({ variant }),
        props.disabled && 'opacity-0',
        className
      )}>
      <Badge
        className={cn(
          'absolute right-0 top-0 z-10 -m-2 h-6 w-6 border border-border bg-background p-1 transition-opacity duration-200',
          hasBadge ? 'opacity-100' : 'opacity-0'
        )}>
        <Typography className="text-[10px]">{badgeValue}</Typography>
      </Badge>

      <Icon
        as={icon}
        className={cn(
          'size-4',
          variant === 'destructive' && 'text-background',
          variant === 'default' && 'text-primary-foreground'
        )}
      />
    </Button>
  );
}
