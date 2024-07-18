import Image from 'next/image';

import { IconProps } from '@/common/types/icon-props.type';

import xIcon from './assets/x-icon.svg';

interface XIconProps extends IconProps {}

export default function XIcon(props: XIconProps) {
  return <Image src={xIcon} alt="X icon" {...props} />;
}
