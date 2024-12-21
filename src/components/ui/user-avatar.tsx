'use client';

import { useAuth } from '@/common/hooks';
import { ImageUtils, StringUtils } from '@/common/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeletons';

interface AvatarProps {
  height: number;
  fallbackFontSize?: number;
}

export function UserAvatar({ height, fallbackFontSize }: AvatarProps) {
  const { user } = useAuth();

  return (
    <Avatar style={{ height, width: height }}>
      {user?.avatar && (
        <AvatarImage
          className="object-contain"
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_ENV_NAME}/image/upload/avatars/${user.avatar.id}`}
          alt={`${user.firstName} ${user.lastName}`}
          onLoad={e => {
            console.log('UserAvatar height: ', e.currentTarget.height);
          }}
          style={{
            minHeight: `${user.avatar.baseHeight}px`,
            minWidth: `${user.avatar.baseHeight}px`,
            height: `${user.avatar.baseHeight}px`,
            width: `${user.avatar.baseHeight}px`,
            scale:
              (user.avatar.zoom * height) / (ImageUtils.CROPPER_RADIUS * 2),
            translate: `${(user.avatar.offsetX * height) / (ImageUtils.CROPPER_RADIUS * 2)}px ${(user.avatar.offsetY * height) / (ImageUtils.CROPPER_RADIUS * 2)}px`,
          }}
        />
      )}
      <AvatarFallback style={{ fontSize: `${fallbackFontSize}px` }}>
        {!user ? (
          <Skeleton className="h-full w-full" />
        ) : (
          StringUtils.getFirstLettersUpperCase(
            `${user.firstName} ${user.lastName}`,
          )
        )}
      </AvatarFallback>
    </Avatar>
  );
}
