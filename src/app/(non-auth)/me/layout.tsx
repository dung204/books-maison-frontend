import axios from 'axios';
import { cookies } from 'next/headers';
import { PropsWithChildren } from 'react';

import { User } from '@/common/types/api/user.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import TabsContainer from '@/containers/tabs.container';
import UserProfileContainer from '@/containers/user-profile.container';

export default async function UserLayout({ children }: PropsWithChildren) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const user = await getCurrentUser(accessToken!);

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

async function getCurrentUser(accessToken: string) {
  const res = await axios.get<SuccessResponse<User>>(
    `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/users/me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return res.data.data;
}
