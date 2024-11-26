import Image from 'next/image';

import type { IconProps } from '@/common/types';

import xIcon from './assets/x-icon.svg';

interface XIconProps extends IconProps {}

export function XIcon(props: XIconProps) {
  return <Image src={xIcon} alt="X icon" {...props} />;
}
