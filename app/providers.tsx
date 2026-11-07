'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { LiveRegionAnnouncer } from '@/components/live/LiveRegionAnnouncer';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      {children}
      {/* Persistent global live region container for screen-reader announcements */}
      <LiveRegionAnnouncer />
    </Provider>
  );
}

