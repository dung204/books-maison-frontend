import Image from 'next/image';

import type { IconProps } from '@/common/types';

import facebookIcon from './assets/facebook-icon.svg';

interface FacebookIconProps extends IconProps {}

export function FacebookIcon(props: FacebookIconProps) {
  return <Image src={facebookIcon} alt="Facebook icon" {...props} />;
}
