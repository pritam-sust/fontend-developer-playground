import { useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import {
  announcePolite,
  announceAssertive,
  clearAnnouncements,
} from '@/store/slices/announcementSlice';

/**
 * useAnnounce - Ergonomic hook for triggering accessible screen reader announcements
 */
export function useAnnounce() {
  const dispatch = useAppDispatch();

  const polite = useCallback(
    (message: string) => {
      dispatch(announcePolite(message));
    },
    [dispatch]
  );

  const assertive = useCallback(
    (message: string) => {
      dispatch(announceAssertive(message));
    },
    [dispatch]
  );

  const clear = useCallback(() => {
    dispatch(clearAnnouncements());
  }, [dispatch]);

  return { polite, assertive, clear };
}

