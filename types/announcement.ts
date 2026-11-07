export type AnnouncementType = 'polite' | 'assertive';

export interface AnnouncementLogItem {
  id: string;
  type: AnnouncementType;
  message: string;
  timestamp: string;
}

export interface AnnouncementState {
  politeMessage: string;
  assertiveMessage: string;
  history: AnnouncementLogItem[];
  politeKey: number;
  assertiveKey: number;
}

