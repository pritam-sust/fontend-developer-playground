import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DiscountCode } from '@/types/discount';

export interface DiscountState {
  items: DiscountCode[];
  appliedCodes: string[];
  copyStats: Record<string, number>;
  activeFilter: 'all' | 'popular';
}

const initialDiscounts: DiscountCode[] = [
  {
    id: 'disc-1',
    code: 'A11Y-HERO-50',
    description: '50% off for accessible web engineering toolkits',
    discountPercentage: 50,
    category: 'developer',
    isPopular: true,
    expiresInDays: 7,
  },
  {
    id: 'disc-2',
    code: 'ARCHITECT-35',
    description: '35% off enterprise Next.js and Redux system design templates',
    discountPercentage: 35,
    category: 'architect',
    isPopular: true,
    expiresInDays: 14,
  },
  {
    id: 'disc-3',
    code: 'REACT-PRO-25',
    description: '25% discount on advanced React custom hook collections',
    discountPercentage: 25,
    category: 'developer',
    isPopular: false,
    expiresInDays: 30,
  },
  {
    id: 'disc-4',
    code: 'VIP-ACCESS-99',
    description: 'Exclusive 99% off lifetime access to frontend architecture sandbox',
    discountPercentage: 99,
    category: 'vip',
    isPopular: false,
    expiresInDays: 2,
  },
];

const initialState: DiscountState = {
  items: initialDiscounts,
  appliedCodes: [],
  copyStats: {},
  activeFilter: 'all',
};

export const discountSlice = createSlice({
  name: 'discount',
  initialState,
  reducers: {
    recordCodeCopied: (state, action: PayloadAction<string>) => {
      const code = action.payload;
      state.copyStats[code] = (state.copyStats[code] || 0) + 1;
    },
    applyDiscountCode: (state, action: PayloadAction<string>) => {
      const code = action.payload;
      if (!state.appliedCodes.includes(code)) {
        state.appliedCodes.push(code);
      }
    },
    resetAllDiscounts: (state) => {
      state.appliedCodes = [];
      state.copyStats = {};
    },
    setFilter: (state, action: PayloadAction<'all' | 'popular'>) => {
      state.activeFilter = action.payload;
    },
  },
});

export const {
  recordCodeCopied,
  applyDiscountCode,
  resetAllDiscounts,
  setFilter,
} = discountSlice.actions;

export default discountSlice.reducer;

