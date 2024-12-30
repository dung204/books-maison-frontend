import { Menu } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';

import { Button } from '@/components/ui/buttons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/form';
import { BrandIcon } from '@/components/ui/icons';
import { BrandIconMobile } from '@/components/ui/icons/brand-icon-mobile/BrandIconMobile';
import { GlobalSearchContainer } from '@/containers';
import { UserMenuContainer } from '@/containers/user';

export async function Header() {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get('accessToken')?.value;

  return (
    <header className="fixed top-0 z-50 w-full border-b-[1px] border-b-black/20 bg-white py-2">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <BrandIcon height="58" className="max-lg:hidden" />
          <BrandIconMobile height="48" className="lg:hidden" />
        </Link>
        <nav>
          <ul className="flex items-center gap-8 sm:gap-12 lg:gap-16">
            <div className="flex items-center gap-8 max-sm:hidden sm:gap-12 lg:gap-16">
              <Link href="/categories">Categories</Link>
              <Link href="/authors">Authors</Link>
              <Link href="/books">Books</Link>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="sm:hidden">
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href="/categories">
                  <DropdownMenuItem className="justify-end">
                    Categories
                  </DropdownMenuItem>
                </Link>
                <Link href="/authors">
                  <DropdownMenuItem className="justify-end">
                    Authors
                  </DropdownMenuItem>
                </Link>
                <Link href="/books">
                  <DropdownMenuItem className="justify-end">
                    Books
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
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
