import Image from 'next/image';
import { ComponentProps } from 'react';

export type IconProps = Omit<ComponentProps<typeof Image>, 'src' | 'alt'>;
