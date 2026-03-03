import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/text';
import { KnowledgeLevelEnum, knowledgeLevelText } from '@/lib/enums';
import { useState } from 'react';
import { Platform, View } from 'react-native';

interface Props {
  kl: KnowledgeLevelEnum[];
  onKLChange: (kl: KnowledgeLevelEnum[]) => void;
  open?: boolean;
  onOpenChange: (open?: boolean) => void;
}

export function KnolageLevelDialog({ open, onOpenChange, kl, onKLChange }: Props) {
  const [local, setLocal] = useState(new Set(kl));

  function Item({ value }: { value: KnowledgeLevelEnum }) {
    function toggle() {
      const next = new Set(local);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      setLocal(next);
    }
    return (
      <View className="flex flex-row items-center justify-between gap-3">
        <Label onPress={Platform.select({ native: toggle })} htmlFor={value}>
          {knowledgeLevelText[value]}
        </Label>
        <Checkbox id={value} checked={local.has(value)} onCheckedChange={toggle} />
      </View>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-14">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg">Select Knowledge Level</DialogTitle>
        </DialogHeader>
        <View className="flex gap-4">
          <Item value={'Learning'} />
          <Item value={'GettingThere'} />
          <Item value={'Confident'} />
        </View>
        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button
              variant="outline"
              onPress={() => {
                onOpenChange(false);
              }}>
              <Typography>Cancel</Typography>
            </Button>
          </DialogClose>
          <Button
            onPress={() => {
              onKLChange(Array.from(local));
              onOpenChange(false);
            }}>
            <Typography>Save</Typography>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
