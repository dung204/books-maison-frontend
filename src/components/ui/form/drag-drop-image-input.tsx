'use client';

import { Image as ImageIcon, Upload } from 'lucide-react';
import {
  type ChangeEventHandler,
  type ComponentProps,
  type DragEventHandler,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/cn';

interface DragDropImageInputProps extends ComponentProps<'input'> {}

export function DragDropImageInput({
  className,
  ...props
}: DragDropImageInputProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isUploadingFromLocal, setIsUploadingFromLocal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const Icon = isDraggingOver ? Upload : ImageIcon;

  const handleDragOver: DragEventHandler = e => {
    e.preventDefault();
    if (!isDraggingOver) setIsDraggingOver(true);
  };

  const handleDragLeave: DragEventHandler = e => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop: DragEventHandler = e => {
    e.preventDefault();
    setIsDraggingOver(false);
    console.log('drop');
  };

  const handleFileInputChange: ChangeEventHandler<HTMLInputElement> = e => {};

  return (
    <>
      <div
        className={cn(
          'group relative flex h-[300px] w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-4 border-dashed border-transparent bg-slate-200 transition-all hover:border-blue-400',
          { 'border-blue-400': isDraggingOver },
          className,
        )}
        onClick={() => inputRef.current?.click()}
      >
        <div
          className="absolute inset-0 z-50 h-full w-full bg-transparent"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        ></div>
        <Icon
          className={cn(
            'h-24 w-24 select-none opacity-50 transition-all group-hover:text-blue-700 group-hover:opacity-100',
            { 'text-blue-700 opacity-100': isDraggingOver },
          )}
        />
        <h3
          className={cn(
            'select-none text-lg opacity-50 group-hover:opacity-100',
            { 'opacity-100': isDraggingOver },
          )}
        >
          {getTitleText(isDraggingOver)}
        </h3>
        <p
          className={cn(
            'px-10 text-center text-sm opacity-40 group-hover:opacity-70',
            { 'opacity-70': isDraggingOver },
          )}
        >
          Image must have a minimum dimension of 150px and must not exceed 10MB
          of size.
        </p>
      </div>
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        {...props}
        className="hidden"
      />
    </>
  );
}

function getTitleText(isDraggingOver: boolean) {
  return isDraggingOver
    ? 'Drop the image file to upload'
    : 'Click or drag an image file to this area to upload';
}
