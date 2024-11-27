import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import brandLogo from '@/assets/images/books-maison-logo-dark.svg';
import { Button } from '@/components/ui/buttons';
import { GlobalSearchContainer } from '@/containers';
import { UserMenuContainer } from '@/containers/user';

export async function Header() {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get('accessToken')?.value;

  return (
    <header className="fixed top-0 z-50 w-full border-b-[1px] border-b-black/20 bg-white py-2">
      <div className="container flex items-center justify-between">
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
            <Link href="/categories">Categories</Link>
            <Link href="/authors">Authors</Link>
            <Link href="/books">Books</Link>
            <GlobalSearchContainer asDialog />
            <Link href="/auth/login">
              {!accessToken ? <Button>Login</Button> : <UserMenuContainer />}
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}
