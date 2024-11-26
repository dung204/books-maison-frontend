import Image from 'next/image';

import { IconProps } from '@/common/types';

import instagramIcon from './assets/youtube-icon.svg';

interface InstagramIconProps extends IconProps {}

export function YoutubeIcon(props: InstagramIconProps) {
  return <Image src={instagramIcon} alt="Instagram icon" {...props} />;
}
