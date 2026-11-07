import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertDialogState, AlertActionType } from '@/types/alert';

interface OpenAlertPayload {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  actionType?: AlertActionType;
  isDestructive?: boolean;
}

const initialState: AlertDialogState = {
  isOpen: false,
  title: 'Confirm Critical Action',
  description: 'Are you sure you want to perform this operation? This will modify your current discount state.',
  confirmLabel: 'Confirm Action',
  cancelLabel: 'Cancel',
  actionType: 'reset-discounts',
  isDestructive: true,
  status: 'idle',
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    openAlert: (state, action: PayloadAction<OpenAlertPayload | undefined>) => {
      state.isOpen = true;
      state.status = 'idle';
      if (action?.payload) {
        state.title = action.payload.title;
        state.description = action.payload.description;
        state.confirmLabel = action.payload.confirmLabel ?? 'Confirm Action';
        state.cancelLabel = action.payload.cancelLabel ?? 'Cancel';
        state.actionType = action.payload.actionType ?? 'generic';
        state.isDestructive = action.payload.isDestructive ?? true;
      }
    },
    closeAlert: (state) => {
      state.isOpen = false;
      state.status = 'cancelled';
    },
    confirmAlert: (state) => {
      state.isOpen = false;
      state.status = 'confirmed';
    },
  },
});

export const { openAlert, closeAlert, confirmAlert } = alertSlice.actions;

export default alertSlice.reducer;

