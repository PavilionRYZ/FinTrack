'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';

export function StoreProvider({ children }) {
  useEffect(() => {
    useStore.persist.rehydrate();
  }, []);

  return children;
}
