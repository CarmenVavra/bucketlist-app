export interface MessageItem {
  id?: number;
  userId?: number;
  userIdRecipient?: number;
  subject?: string;
  text?: string;
  sent?: boolean;
  sentAt?: Date;
  received?: boolean;
  receivedAt?: Date;
  wasRead?: boolean;
  wasReadAt?: Date;
  answered?: boolean;
  answeredAt?: Date;
  answeredMessageId?: number;
  type?: MessageType;
}

export enum MessageType {
  RECEIVED = 'received',
  SENT = 'sent',
  ANSWERED = 'answered',
  DRAFT = 'draft',
}