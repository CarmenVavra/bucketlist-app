export enum ROUTE_PATHS {
  PUBLIC = '/public',
  PUBLIC_BUCKET_LIST = 'public/bucket-list',
  PUBLIC_FANTASIES = 'public/fantasies',
  PRIVATE = 'private',
  PRIVATE_BUCKET_LIST = 'private/bucket-list',
  BUCKET_LIST_ITEM_CREATE = 'bucket-list-item/create',
  BUCKET_LIST_ITEM_EDIT = 'bucket-list-item/edit',
  PRIVATE_FANTASIES = 'private/fantasies',
  FANTASY_ITEM_CREATE = 'fantasy-item/create',
  FANTASY_ITEM_EDIT = 'fantasy-item/edit',
  NOTES = 'notes',
  NOTE_ITEM_CREATE = 'note-item/create',
  NOTE_ITEM_EDIT = 'note-item/edit',
  MESSAGES = 'messages',
  MESSAGE_ITEM_CREATE = 'message-item/create',
  MESSAGE_ITEM_EDIT = 'message-item/edit',
  MESSAGE_ITEM_REPLY = 'message-item/reply',
  ACTIVITIES = 'activities',
  ACTIVITY_ITEM_CREATE = 'activity-item/create',
  ACTIVITY_ITEM_EDIT = 'activity-item/edit',
  LOGIN = 'login',
  LOGOUT = 'logout',
  REGISTER = 'register',
};

export enum ROUTE_PATHS_ACTIONS {
  VIEW = 'view',
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete',
}

export const MENUITEMS: MenuItem[] = [
  { id: 10, text: 'Home', path: ROUTE_PATHS.PUBLIC, icon: 'fa-solid fa-house', hierarchy: 'parent' },
  { id: 20, text: 'Öffentlich', path: ROUTE_PATHS.PUBLIC, icon: 'fa-solid fa-bullhorn', hierarchy: 'parent' },
  { id: 21, text: 'Bucket-List', path: ROUTE_PATHS.PUBLIC_BUCKET_LIST, icon: 'fa-solid fa-bucket', hierarchy: 'child' },
  { id: 22, text: 'Fantasies', path: ROUTE_PATHS.PUBLIC_FANTASIES, icon: 'fa-solid fa-comment-dots', hierarchy: 'child' },
  { id: 30, text: 'Privat', path: ROUTE_PATHS.PRIVATE, icon: 'fa-solid fa-key', hierarchy: 'parent' },
  { id: 31, text: 'Bucket-List', path: ROUTE_PATHS.PRIVATE_BUCKET_LIST, icon: 'fa-solid fa-bucket', hierarchy: 'child' },
  { id: 32, text: 'Fantasies', path: ROUTE_PATHS.PRIVATE_FANTASIES, icon: 'fa-solid fa-comment-dots', hierarchy: 'child' },
  { id: 40, text: 'Notizen', path: ROUTE_PATHS.NOTES, icon: 'fa-solid fa-clipboard', hierarchy: 'parent' },
  { id: 50, text: 'Unternehmungen', path: ROUTE_PATHS.ACTIVITIES, icon: 'fa-solid fa-children', hierarchy: 'parent' },
  { id: 60, text: 'Nachrichten', path: ROUTE_PATHS.MESSAGES, icon: 'fa-solid fa-envelope', hierarchy: 'parent' },
  { id: 70, text: 'Logout', path: ROUTE_PATHS.LOGOUT, icon: 'fa-solid fa-arrow-right-from-bracket', hierarchy: 'parent' },
];

export interface MenuItem {
  id: number;
  text: string;
  path: string;
  icon?: string;
  hierarchy?: 'parent' | 'child';
}

export interface SimpleTitleText {
  title?: string;
  text?: string;
}

