'use client';

import { Image as ImageIcon } from 'lucide-react';
import { type ComponentProps, useState } from 'react';

import { Button } from '@/components/ui/buttons';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialogs';
import { DragDropImageInput } from '@/components/ui/form';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/cn';

interface UploadAvatarContainerProps {
  className?: string;
}

interface UploadAvatarDialogContentProps
  extends ComponentProps<typeof TooltipContent> {}

export function UploadAvatarContainer({
  className,
}: UploadAvatarContainerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={cn('rounded-full py-6', className)}
                onClick={() => setOpen(true)}
              >
                <ImageIcon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Upload new avatar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <UploadAvatarDialogContent />
    </Dialog>
  );
}

function UploadAvatarDialogContent({
  className,
  ...props
}: UploadAvatarDialogContentProps) {
  return (
    <DialogContent className={cn('sm:max-w-[625px]', className)} {...props}>
      <DialogHeader>
        <DialogTitle>Upload avatar</DialogTitle>
      </DialogHeader>
      <div>
        <DragDropImageInput />
      </div>
    </DialogContent>
  );
}
