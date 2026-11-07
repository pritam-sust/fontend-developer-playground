import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState } from '@/types/modal';

const initialState: ModalState = {
  isOpen: false,
  selectedCodeId: null,
  copiedCode: null,
  openedAt: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ codeId?: string } | undefined>) => {
      state.isOpen = true;
      state.selectedCodeId = action?.payload?.codeId ?? null;
      state.openedAt = new Date().toISOString();
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.selectedCodeId = null;
      state.copiedCode = null;
    },
    setCopiedCode: (state, action: PayloadAction<string | null>) => {
      state.copiedCode = action.payload;
    },
  },
});

export const { openModal, closeModal, setCopiedCode } = modalSlice.actions;

export default modalSlice.reducer;

