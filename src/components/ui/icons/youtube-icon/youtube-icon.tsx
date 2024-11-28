import Image from 'next/image';

import type { IconProps } from '@/common/types';

import youtubeIcon from './assets/youtube-icon.svg';

interface YoutubeIconProps extends IconProps {}

export function YoutubeIcon(props: YoutubeIconProps) {
  return <Image src={youtubeIcon} alt="Youtube icon" {...props} />;
}
