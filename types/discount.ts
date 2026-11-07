export interface DiscountCode {
  id: string;
  code: string;
  description: string;
  discountPercentage: number;
  category: 'seasonal' | 'architect' | 'developer' | 'vip';
  isPopular?: boolean;
  expiresInDays: number;
}

export type DiscountCategory = DiscountCode['category'];

