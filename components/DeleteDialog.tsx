import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Typography } from '@/components/ui/text';

interface DeleteDialogProps {
  children: React.ReactNode; // The trigger button
  title?: string;
  description?: string;
  onConfirm: () => void;
  isPending?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeleteDialog({
  children,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  onConfirm,
  isPending,
  open,
  onOpenChange,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              <Typography>Cancel</Typography>
            </Button>
          </DialogClose>
          <Button variant="destructive" onPress={onConfirm} disabled={isPending}>
            <Typography>{isPending ? 'Deleting...' : 'Delete'}</Typography>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
