import { ActivityItem } from "../../activities/models/activity.model";
import { CheckboxItem } from "../../core/checkbox-list/models/checkbox-list.model";

export interface TakeAway extends CheckboxItem {
  id?: number;
  userId?: number;
  description?: string;
}

export interface ActivityItemWithTakeAways extends ActivityItem {
  takeAways?: TakeAway[];
}