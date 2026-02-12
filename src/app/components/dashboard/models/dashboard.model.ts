import { ROUTE_PATHS } from "../../../models/general.model";

export enum AREA {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export interface DashboardCard {
  title: string;
  subtitle: string;
  content: string;
  path: string;
  icon?: string;
  color?: string;
}

export const PUBLIC_CARD_ITEMS: DashboardCard[] = [
  {
    title: 'Bucket-List',
    subtitle: '',
    content: 'Public Bucket-List',
    path: ROUTE_PATHS.PUBLIC_BUCKET_LIST,
    icon: 'fa-solid fa-bucket',
    color: 'bucket-list',
  },
  {
    title: 'Fantasies',
    subtitle: '',
    content: 'Public Fantasies',
    path: ROUTE_PATHS.PUBLIC_FANTASIES,
    icon: 'fa-solid fa-comment-dots',
    color: 'fantasies',
  },
];

export const PRIVATE_CARD_ITEMS: DashboardCard[] = [
  {
    title: 'Bucket-List', subtitle: '', content: 'Private Bucket-List',
    path: ROUTE_PATHS.PRIVATE_BUCKET_LIST, icon: 'fa-solid fa-bucket', color: 'bucket-list'
  },
  {
    title: 'Fantasies', subtitle: '', content: 'Private Fantasies',
    path: ROUTE_PATHS.PRIVATE_FANTASIES, icon: 'fa-solid fa-comment-dots', color: 'fantasies'
  },
  {
    title: 'Notizen', subtitle: '', content: 'Private Notizen',
    path: ROUTE_PATHS.NOTES, icon: 'fa-solid fa-clipboard', color: 'notes'
  },
  {
    title: 'Unternehmungen', subtitle: '', content: 'Private Activities',
    path: ROUTE_PATHS.ACTIVITIES, icon: 'fa-solid fa-children', color: 'activities'
  },
  {
    title: 'Nachrichten', subtitle: '', content: 'Private Nachrichten',
    path: ROUTE_PATHS.MESSAGES, icon: 'fa-solid fa-envelope', color: 'messages'
  },
];

