'use client';

import {
  Image as ImageIcon,
  Minus,
  Plus,
  Save,
  Trash2,
  Upload,
} from 'lucide-react';
import {
  type ComponentProps,
  type DragEventHandler,
  type ForwardedRef,
  type MouseEventHandler,
  type ReactEventHandler,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';

import { ImageUtils } from '@/common/utils';
import { Button } from '@/components/ui/buttons';
import { Slider } from '@/components/ui/form/slider';
import LoadingIndicator from '@/components/ui/loading-indicator';
import { cn } from '@/lib/cn';

interface DragDropImageInputProps extends ComponentProps<'input'> {
  onSave?: (
    image: File,
    position: ImagePosition,
    scale: number,
  ) => void | Promise<void>;
}

export interface ImagePayload {
  file: File;
  previewUrl: string;
}

export interface ImageScale {
  min: number;
  max: number;
  current: number;
}

export interface ImagePosition {
  x: number;
  y: number;
}

interface DragDropImageCropperRef {
  getCurrentImage: () => ImagePayload | undefined;
}

function InternalDragDropImageCropper(
  { className, onSave, ...props }: DragDropImageInputProps,
  ref: ForwardedRef<DragDropImageCropperRef>,
) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isLoadingFromLocal, setIsUploadingFromLocal] = useState(false);
  const [currentImage, setCurrentImage] = useState<ImagePayload>();
  const [imageScale, setImageScale] = useState<ImageScale>();
  const [imageWidth, setImageWidth] = useState<number>(150);
  const [imagePosition, setImagePosition] = useState<ImagePosition>({
    x: 0,
    y: 0,
  });
  const [isMovingImage, setIsMovingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewImageRef = useRef<HTMLImageElement>(null);

  const Icon = getIcon(isDraggingOver, isLoadingFromLocal);

  const handleFileInputChange = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file type. Please upload an image file.');
      return;
    }

    if (file.size > ImageUtils.MAXIMUM_FILE_SIZE) {
      toast.error('File size exceeds the limit of 10MB.');
      return;
    }

    setIsUploadingFromLocal(true);
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const previewImageElem = new Image();
      const previewUrl = fileReader.result?.toString() || '';

      previewImageElem.addEventListener('load', e => {
        const { naturalWidth, naturalHeight, src } =
          e.currentTarget as HTMLImageElement;

        if (
          naturalWidth < ImageUtils.MINIMUM_DIMENSION ||
          naturalHeight < ImageUtils.MINIMUM_DIMENSION
        ) {
          toast.error(
            'Image resolution is too low. Minimum resolution is 150x150.',
          );
          return;
        }

        setCurrentImage({
          file,
          previewUrl: src,
        });
        setIsUploadingFromLocal(false);
      });

      previewImageElem.src = previewUrl;
    });
    fileReader.readAsDataURL(file);
  };

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

    if (e.dataTransfer.items.length > 1) {
      toast.error('You can only upload one image at a time.');
      return;
    }

    handleFileInputChange(e.dataTransfer.files[0]);
  };

  const handlePreviewLoad: ReactEventHandler<HTMLImageElement> = e => {
    const { height, width } = e.currentTarget;
    const scale = (ImageUtils.CROPPER_RADIUS * 2) / height;
    setImageWidth(width);
    setImageScale({
      min: scale,
      max: scale * ImageUtils.MAX_ZOOM_RATIO,
      current: scale,
    });
  };

  const handleStartMoveImage: MouseEventHandler<HTMLImageElement> = e => {
    e.preventDefault();
    setIsMovingImage(true);
  };

  const handleMoveImage: MouseEventHandler<HTMLImageElement> = e => {
    if (!isMovingImage) return;

    const { movementX, movementY } = e;
    const currentImageWidth = e.currentTarget.width * imageScale!.current;
    const currentImageHeight = e.currentTarget.height * imageScale!.current;
    const maxOffsetX = currentImageWidth / 2 - ImageUtils.CROPPER_RADIUS;
    const maxOffsetY = currentImageHeight / 2 - ImageUtils.CROPPER_RADIUS;

    let newPositionX: number;
    let newPositionY: number;

    if (movementX > 0) {
      newPositionX = Math.min(imagePosition.x + movementX, maxOffsetX);
    } else {
      newPositionX = Math.max(imagePosition.x + movementX, -maxOffsetX);
    }

    if (movementY > 0) {
      newPositionY = Math.min(imagePosition.y + movementY, maxOffsetY);
    } else {
      newPositionY = Math.max(imagePosition.y + movementY, -maxOffsetY);
    }

    setImagePosition({
      x: newPositionX,
      y: newPositionY,
    });
  };

  const handleEndMoveImage: MouseEventHandler<HTMLImageElement> = e => {
    e.preventDefault();
    setIsMovingImage(false);
  };

  const handleResetAll = () => {
    setCurrentImage(undefined);
    setImageScale(undefined);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleSave = async () => {
    if (!currentImage) return;

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 4000));
    await onSave?.(currentImage.file, imagePosition, imageScale!.current);
    setIsSaving(false);
  };

  const handleImageScaleChange = ([value]: number[]) => {
    console.log(
      `width: ${previewImageRef.current!.width}, height: ${previewImageRef.current!.height}`,
    );
    if (imageScale) {
      const newImageWidth = previewImageRef.current!.width * value;
      const newImageHeight = previewImageRef.current!.height * value;
      const newMaxOffsetX = newImageWidth / 2 - ImageUtils.CROPPER_RADIUS;
      const newMaxOffsetY = newImageHeight / 2 - ImageUtils.CROPPER_RADIUS;
      const newPosition: ImagePosition = {
        x: imagePosition.x,
        y: imagePosition.y,
      };

      if (imagePosition.x > newMaxOffsetX) {
        newPosition.x = newMaxOffsetX;
      }

      if (imagePosition.x < -newMaxOffsetX) {
        newPosition.x = -newMaxOffsetX;
      }

      if (imagePosition.y > newMaxOffsetY) {
        newPosition.y = newMaxOffsetY;
      }

      if (imagePosition.y < -newMaxOffsetY) {
        newPosition.y = -newMaxOffsetY;
      }

      setImageScale({ ...imageScale, current: value });
      setImagePosition(newPosition);
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      getCurrentImage: () => currentImage,
    }),
    [currentImage],
  );

  if (!currentImage) {
    return (
      <>
        <div
          className={cn(
            'group relative flex h-[300px] w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-4 border-dashed border-transparent bg-slate-200 transition-all hover:border-blue-400',
            { 'border-blue-400': isDraggingOver },
            className,
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          <div
            className="absolute inset-0 z-50 h-full w-full bg-transparent"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
          <Icon
            className={cn(
              'h-24 w-24 select-none opacity-50 transition-all group-hover:text-blue-700 group-hover:opacity-100',
              { 'text-blue-700 opacity-100': isDraggingOver },
            )}
          />
          <h3
            className={cn(
              'select-none text-center text-lg opacity-50 group-hover:opacity-100',
              { 'opacity-100': isDraggingOver },
            )}
          >
            {getTitleText(isDraggingOver, isLoadingFromLocal)}
          </h3>
          <p
            className={cn(
              'px-10 text-center text-sm opacity-40 group-hover:opacity-70',
              { 'opacity-70': isDraggingOver },
            )}
          >
            Image must have a minimum resolution of 150x150 and must not exceed
            10MB of size.
          </p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={e => handleFileInputChange(e.target.files?.[0])}
          {...props}
        />
      </>
    );
  }

  return (
    <>
      <div
        className="flex h-[400px] w-full flex-nowrap items-center justify-center overflow-hidden"
        style={{
          WebkitMaskImage: `radial-gradient(circle, black ${ImageUtils.CROPPER_RADIUS}px, rgba(0, 0, 0, 0.2) ${ImageUtils.CROPPER_RADIUS}px)`,
          maskImage: `radial-gradient(circle, black ${ImageUtils.CROPPER_RADIUS}px, rgba(0, 0, 0, 0.2) ${ImageUtils.CROPPER_RADIUS}px)`,
        }}
      >
        <img
          ref={previewImageRef}
          src={currentImage.previewUrl}
          loading="lazy"
          decoding="async"
          className={cn('cursor-grab', {
            'cursor-grabbing': isMovingImage,
          })}
          style={{
            scale: imageScale?.current,
            translate: `${imagePosition.x}px ${imagePosition.y}px`,
            minWidth: `${imageWidth}px`,
            width: `${imageWidth}px`,
          }}
          onLoad={handlePreviewLoad}
          onMouseDown={handleStartMoveImage}
          onMouseMove={handleMoveImage}
          onMouseUp={handleEndMoveImage}
        />
      </div>
      <div className="mb-8 mt-4 flex w-full items-center justify-center">
        <Button
          variant="ghost"
          disabled={imageScale && imageScale.current <= imageScale.min}
          onClick={() =>
            handleImageScaleChange([
              imageScale!.current - ImageUtils.ZOOM_STEP * 10,
            ])
          }
        >
          <Minus className="h-6 w-6" />
        </Button>
        <Slider
          min={imageScale?.min}
          max={imageScale?.max}
          step={ImageUtils.ZOOM_STEP}
          className="w-[50%] cursor-grab"
          value={[imageScale?.current || 1]}
          onValueChange={handleImageScaleChange}
        />
        <Button
          variant="ghost"
          disabled={imageScale && imageScale.current >= imageScale.max}
          onClick={() =>
            handleImageScaleChange([
              imageScale!.current + ImageUtils.ZOOM_STEP * 10,
            ])
          }
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex w-full items-center justify-center gap-4">
        <Button
          variant="destructive"
          onClick={handleResetAll}
          disabled={isSaving}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remove
        </Button>
        <Button
          onClick={() => setImagePosition({ x: 0, y: 0 })}
          disabled={isSaving}
        >
          Reset to center
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <LoadingIndicator className="mr-2 h-4 w-4" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save
            </>
          )}
        </Button>
      </div>
    </>
  );
}

function getTitleText(isDraggingOver: boolean, isUploadingFromLocal: boolean) {
  if (isUploadingFromLocal) return 'Uploading...';

  return isDraggingOver
    ? 'Drop the image file to upload'
    : 'Click or drag an image file to this area to upload';
}

function getIcon(isDraggingOver: boolean, isUploadingFromLocal: boolean) {
  if (isUploadingFromLocal) return LoadingIndicator;

  return isDraggingOver ? Upload : ImageIcon;
}

const DragDropImageCropper = forwardRef(InternalDragDropImageCropper);
export { DragDropImageCropper };
