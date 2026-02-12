export interface BucketListItem {
  id?: number;
  userId: number;
  title: string;
  description: string;
  nickname?: string;
  accepted?: boolean;
  denied?: boolean;
  priorityId?: number;
  done?: boolean;
  published?: boolean;
  wasRead?: boolean;
  wasReadDate?: Date;
}

export class PRIORITY {
  static readonly HIGH = { id: 1, text: 'high', displayName: 'Hoch' };
  static readonly MEDIUM = { id: 2, text: 'medium', displayName: 'Mittel' };
  static readonly LOW = { id: 3, text: 'low', displayName: 'Niedrig' };

  static readonly LIST = [
    PRIORITY.HIGH,
    PRIORITY.MEDIUM,
    PRIORITY.LOW
  ];
}