'use client';

import { Image as ImageIcon } from 'lucide-react';
import { type ComponentRef, useRef, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/buttons';
import {
  ConfirmDiscardChangesDialog,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialogs';
import { DragDropImageCropper, type ImagePosition } from '@/components/ui/form';
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

export function UploadAvatarContainer({
  className,
}: UploadAvatarContainerProps) {
  const [open, setOpen] = useState(false);
  const [discardDialogOpen, setDiscardDialogOpen] = useState(false);
  const imageCropperRef =
    useRef<ComponentRef<typeof DragDropImageCropper>>(null);

  const handleUploadImageAndCloseDialog = (
    image: File,
    position: ImagePosition,
    scale: number,
  ) => {
    toast.success('Avatar is saved successfully!');
    setOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && imageCropperRef.current?.getCurrentImage()) {
      setOpen(true);
      setDiscardDialogOpen(true);
      return;
    }

    setOpen(open);
  };

  const handleDiscard = () => {
    setOpen(false);
    setDiscardDialogOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
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
        <DialogContent className="sm:max-w-[50%]">
          <DialogHeader>
            <DialogTitle>Upload avatar</DialogTitle>
          </DialogHeader>
          <div>
            <DragDropImageCropper
              ref={imageCropperRef}
              onSave={handleUploadImageAndCloseDialog}
            />
          </div>
        </DialogContent>
      </Dialog>
      <ConfirmDiscardChangesDialog
        open={discardDialogOpen}
        onOpenChange={setDiscardDialogOpen}
        onDiscard={handleDiscard}
      />
    </>
  );
}
