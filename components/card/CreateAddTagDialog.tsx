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

interface Props {
  children: React.ReactNode;
  onAddTag: () => void;
  onCreateTag: () => void;
  open?: boolean;

  onOpenChange?: (open: boolean) => void;
}

export function CreateAddTagDialog({ children, onAddTag, onCreateTag, open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Cards to Tag</DialogTitle>
          <DialogDescription>
            Choose whether to create a brand new tag or add these cards to an existing one.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              <Typography>Cancel</Typography>
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="secondary" onPress={onAddTag}>
              <Typography>{'Add to existing tag'}</Typography>
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="secondary" onPress={onCreateTag}>
              <Typography>{'Create new tag'}</Typography>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
