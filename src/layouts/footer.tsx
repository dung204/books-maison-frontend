import Image from 'next/image';
import Link from 'next/link';

import brandLogo from '@/assets/images/books-maison-logo-light.svg';
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YoutubeIcon,
} from '@/components/ui/icons';

export function Footer() {
  return (
    <footer className="bg-black/85 py-16 text-white">
      <div className="container grid grid-cols-12 max-lg:gap-y-16">
        <div className="col-span-6 flex flex-col gap-5 max-lg:order-3 max-lg:col-span-12 max-lg:items-center max-lg:text-center">
          <Image src={brandLogo} alt="Brand logo" width="289" height="72" />
          <p className="text-sm">
            Address: 3 Phu Xa Street, Phu Thuong Ward, Tay Ho District, Hanoi
          </p>
          <p className="text-sm">Phone: (+84) 9 0606 35 98</p>
          <p className="text-sm">© 2024 Books Maison. All rights reserved.</p>
          <div className="mt-2 flex gap-8">
            <Link href="#">
              <FacebookIcon />
            </Link>
            <Link href="#">
              <InstagramIcon />
            </Link>
            <Link href="#">
              <XIcon />
            </Link>
            <Link href="#">
              <YoutubeIcon />
            </Link>
          </div>
        </div>
        <div className="col-span-3 max-lg:order-1 max-lg:col-span-6 max-lg:text-center max-sm:col-span-12">
          <h2 className="mb-6 text-2xl font-semibold">Links</h2>
          <div className="flex flex-col gap-3 text-sm">
            <Link href="#">About Books Maison</Link>
            <Link href="#">FAQ (Frequently Asked Questions)</Link>
            <Link href="#">Authors</Link>
            <Link href="#">Categories</Link>
            <Link href="#">Terms and Conditions</Link>
            <Link href="#">Privacy policy</Link>
          </div>
        </div>
        <div className="col-span-3 max-lg:order-2 max-lg:col-span-6 max-lg:text-center max-sm:col-span-12">
          <h2 className="mb-6 text-2xl font-semibold">Working hours</h2>
          <div className="flex flex-col gap-3 text-sm">
            <p>Monday - Sunday, excluding holidays</p>
            <p>08:00 am - 05:00 pm</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
