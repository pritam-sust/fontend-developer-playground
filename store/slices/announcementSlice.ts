import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnnouncementState, AnnouncementLogItem, AnnouncementType } from '@/types/announcement';

const initialState: AnnouncementState = {
  politeMessage: '',
  assertiveMessage: '',
  history: [],
  politeKey: 0,
  assertiveKey: 0,
};

export const announcementSlice = createSlice({
  name: 'announcement',
  initialState,
  reducers: {
    announcePolite: (state, action: PayloadAction<string>) => {
      const message = action.payload;
      state.politeMessage = message;
      state.politeKey += 1;
      
      const logItem: AnnouncementLogItem = {
        id: `ann-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        type: 'polite',
        message,
        timestamp: new Date().toLocaleTimeString(),
      };
      state.history.unshift(logItem);
      if (state.history.length > 20) {
        state.history.pop();
      }
    },
    announceAssertive: (state, action: PayloadAction<string>) => {
      const message = action.payload;
      state.assertiveMessage = message;
      state.assertiveKey += 1;

      const logItem: AnnouncementLogItem = {
        id: `ann-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        type: 'assertive',
        message,
        timestamp: new Date().toLocaleTimeString(),
      };
      state.history.unshift(logItem);
      if (state.history.length > 20) {
        state.history.pop();
      }
    },
    clearAnnouncements: (state) => {
      state.politeMessage = '';
      state.assertiveMessage = '';
    },
    clearAnnouncementHistory: (state) => {
      state.history = [];
    },
  },
});

export const {
  announcePolite,
  announceAssertive,
  clearAnnouncements,
  clearAnnouncementHistory,
} = announcementSlice.actions;

export default announcementSlice.reducer;

