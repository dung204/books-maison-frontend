import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import brandLogo from '@/assets/images/books-maison-logo-dark.svg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import UserMenuContainer from '@/containers/user-menu.container';

export default function Header() {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get('accessToken')?.value;

  return (
    <header className="container flex items-center justify-between py-2">
      <Link href="/">
        <Image
          src={brandLogo}
          alt="Brand logo"
          width="232"
          height="58"
          className="self-center"
        />
      </Link>
      <nav>
        <ul className="flex items-center gap-16">
          <Link href="#">About Books Maison</Link>
          <Link href="#">Categories</Link>
          <Link href="#">Authors</Link>
          <Link href="#">Search</Link>
          <Link href="/auth/login">
            {!accessToken ? <Button>Login</Button> : <UserMenuContainer />}
          </Link>
        </ul>
      </nav>
    </header>
  );
}
