import Image from 'next/image';

import { IconProps } from '@/common/types/icon-props.type';

import instagramIcon from './assets/instagram-icon.svg';

interface InstagramIconProps extends IconProps {}

export default function InstagramIcon(props: InstagramIconProps) {
  return <Image src={instagramIcon} alt="Instagram icon" {...props} />;
}
