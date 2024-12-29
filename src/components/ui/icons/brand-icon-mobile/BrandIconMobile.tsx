import Image from 'next/image';
import type { ComponentProps } from 'react';

import brandIconMobile from '@/assets/images/books-maison-mobile-icon.svg';

export function BrandIconMobile(
  props: Omit<ComponentProps<typeof Image>, 'src' | 'alt'>,
) {
  return <Image src={brandIconMobile} alt="" {...props} />;
}
