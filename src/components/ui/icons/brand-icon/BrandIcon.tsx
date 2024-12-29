import Image from 'next/image';
import type { ComponentProps } from 'react';

import brandLogo from '@/assets/images/books-maison-logo-dark.svg';

export function BrandIcon(
  props: Omit<ComponentProps<typeof Image>, 'src' | 'alt'>,
) {
  return <Image src={brandLogo} alt="Brand logo" {...props} />;
}
