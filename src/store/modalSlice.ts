import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  modalType: 'login' | 'register' | 'success' | null;
}

const initialState: ModalState = {
  modalType: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalState['modalType']>) => {
      state.modalType = action.payload;
    },
    closeModal: (state) => {
      state.modalType = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
