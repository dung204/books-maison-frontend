import { PropsWithChildren } from 'react';

import { TabsContainer } from '@/containers';
import { UserProfileContainer } from '@/containers/user';

export default async function UserLayout({ children }: PropsWithChildren) {
  return (
    <div className="container mt-[74px] grid grid-cols-12 gap-20 py-10">
      <div className="col-span-3">
        <UserProfileContainer />
      </div>
      <div className="col-span-9">
        <TabsContainer
          tabs={[
            { href: '/me/checkouts', label: 'Checkouts' },
            { href: '/me/favourite-books', label: 'Favourite books' },
            { href: '/me/fines', label: 'Fines' },
            { href: '/me/transactions', label: 'Transactions' },
          ]}
        >
          {children}
        </TabsContainer>
      </div>
    </div>
  );
}
