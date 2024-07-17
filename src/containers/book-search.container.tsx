'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function BookSearchContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const [books, setBooks] = useState([]);
}
