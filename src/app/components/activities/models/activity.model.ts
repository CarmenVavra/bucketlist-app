export interface ActivityItem {
  id?: number;
  title?: string;
  description?: string;
  userId?: number;
  executionDate?: string;
  executionTime?: string;
  executionFromDate?: string;
  executionToDate?: string;
  executionFromTime?: string;
  executionToTime?: string;
  location?: string;
  duration?: string;
  done?: boolean;
  createdAt?: string;
  updatedAt?: string;
}