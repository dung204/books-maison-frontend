import Image from 'next/image';

import { IconProps } from '@/common/types/icon-props.type';

import momoIcon from './assets/momo-logo.svg';

interface MomoIconProps extends IconProps {}

export default function MomoIcon(props: MomoIconProps) {
  return <Image src={momoIcon} alt="Momo icon" {...props} />;
}
