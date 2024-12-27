import Image from 'next/image';

import type { IconProps } from '@/common/types';

import googleIcon from './assets/google-icon.svg';

export function GoogleIcon(props: IconProps) {
  return <Image src={googleIcon} alt="Google icon" {...props} />;
}
