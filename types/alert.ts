export type AlertActionType = 'reset-discounts' | 'purge-cache' | 'revoke-code' | 'generic';

export interface AlertDialogState {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  actionType: AlertActionType;
  isDestructive: boolean;
  status: 'idle' | 'confirmed' | 'cancelled';
}

