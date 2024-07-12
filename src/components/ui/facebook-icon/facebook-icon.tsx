import Image from 'next/image';

import { IconProps } from '@/common/types/icon-props.type';

import facebookIcon from './assets/facebook-icon.svg';

interface FacebookIconProps extends IconProps {}

export default function FacebookIcon(props: FacebookIconProps) {
  return <Image src={facebookIcon} alt="Facebook icon" {...props} />;
}
