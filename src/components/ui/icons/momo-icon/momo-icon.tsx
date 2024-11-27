import Image from 'next/image';

import type { IconProps } from '@/common/types';

import momoIcon from './assets/momo-logo.svg';

interface MomoIconProps extends IconProps {}

export function MomoIcon(props: MomoIconProps) {
  return <Image src={momoIcon} alt="Momo icon" {...props} />;
}
