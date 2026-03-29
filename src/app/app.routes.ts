import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { PublicBucketListComponent } from './components/bucketlist/public/public-bucket-list/public-bucket-list.component';
import { PublicFantasiesComponent } from './components/fantasies/public/public-fantasies/public-fantasies.component';
import { PrivateBucketListComponent } from './components/bucketlist/private/private-bucket-list/private-bucket-list.component';
import { PrivateFantasiesComponent } from './components/fantasies/private/private-fantasies/private-fantasies.component';
import { NotesComponent } from './components/notes/notes.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { CreateBucketListItemComponent } from './components/bucketlist/private/private-bucket-list/save/create-bucket-list-item/create-bucket-list-item.component';
import { UpdateBucketListItemComponent } from './components/bucketlist/private/private-bucket-list/save/update-bucket-list-item/update-bucket-list-item.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './components/auth/services/auth-guard';
import { UpdateActivityComponent } from './components/activities/save/update-activity/update-activity.component';
import { CreateActivityComponent } from './components/activities/save/create-activity/create-activity.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AREA } from './components/dashboard/models/dashboard.model';
import { CreateNoteComponent } from './components/notes/save/create-note/create-note.component';
import { UpdateNoteComponent } from './components/notes/save/update-note/update-note.component';
import { CreateFantasyItemComponent } from './components/fantasies/private/save/create-fantasy-item/create-fantasy-item.component';
import { UpdateFantasyItemComponent } from './components/fantasies/private/save/update-fantasy-item/update-fantasy-item.component';
import { TakeAwaysComponent } from './components/take-aways/take-aways.component';

export const routes: Routes = [
  // { path: 'permissionDenied', component: PermissionDeniedComponent },
  {
    path: 'public',
    component: DashboardComponent,
    data: { breadcrumb: 'Öffentlich', area: AREA.PUBLIC },
    canActivate: [AuthGuard],
  },
  {
    path: 'public/bucket-list',
    component: PublicBucketListComponent,
    data: { breadcrumb: 'Bucket-List' },
    canActivate: [AuthGuard],
  },
  {
    path: 'public/fantasies',
    component: PublicFantasiesComponent,
    data: { breadcrumb: 'Fantasien' },
    canActivate: [AuthGuard],
  },
  {
    path: 'private',
    component: DashboardComponent,
    data: { breadcrumb: 'Privat', area: AREA.PRIVATE },
    canActivate: [AuthGuard],
  },
  {
    path: 'private/bucket-list',
    component: PrivateBucketListComponent,
    data: { breadcrumb: 'Bucket-List' },
    canActivate: [AuthGuard],
  },
  {
    path: 'bucket-list-item/create',
    component: CreateBucketListItemComponent,
    data: { breadcrumb: 'Bucket-List-Eintrag hinzufügen' },
    canActivate: [AuthGuard],
  },
  {
    path: 'bucket-list-item/edit/:bucketListItemId',
    component: UpdateBucketListItemComponent,
    data: { breadcrumb: 'Bucket-List-Eintrag bearbeiten' },
    canActivate: [AuthGuard],
  },
  {
    path: 'private/fantasies',
    component: PrivateFantasiesComponent,
    data: { breadcrumb: 'Fantasien' },
    canActivate: [AuthGuard],
  },
  {
    path: 'fantasy-item/create',
    component: CreateFantasyItemComponent,
    data: { breadcrumb: 'Fantasie-Eintrag hinzufügen' },
    canActivate: [AuthGuard],
  },
  {
    path: 'fantasy-item/edit/:fantasyItemId',
    component: UpdateFantasyItemComponent,
    data: { breadcrumb: 'Fantasy-Eintrag bearbeiten' },
    canActivate: [AuthGuard],
  },
  {
    path: 'notes',
    component: NotesComponent,
    data: { breadcrumb: 'Notizen' },
    canActivate: [AuthGuard],
  },
  {
    path: 'note-item/create',
    component: CreateNoteComponent,
    data: { breadcrumb: 'Notiz hinzufügen' },
    canActivate: [AuthGuard],
  },
  {
    path: 'note-item/edit/:noteItemId',
    component: UpdateNoteComponent,
    data: { breadcrumb: 'Notiz bearbeiten' },
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'messages',
  //   component: MessagesComponent,
  //   data: { breadcrumb: 'Nachrichten' },
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: ROUTE_PATHS.MESSAGE_ITEM_CREATE,
  //   component: CreateMessageComponent,
  //   data: { breadcrumb: 'Nachricht verfassen' },
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'message-item/edit/:messageItemId',
  //   component: UpdateMessageComponent,
  //   data: { breadcrumb: 'Nachricht bearbeiten' },
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'message-item/reply/:messageItemId',
  //   component: ReplyMessageComponent,
  //   data: { breadcrumb: 'Nachricht beantworten' },
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'activities',
    component: ActivitiesComponent,
    data: { breadcrumb: 'Unternehmungen' },
    canActivate: [AuthGuard],
  },
  {
    path: 'activity-item/create',
    component: CreateActivityComponent,
    data: { breadcrumb: 'Unternehmung erstellen' },
    canActivate: [AuthGuard],
  },
  {
    path: 'activity-item/edit/:activityId',
    component: UpdateActivityComponent,
    data: { breadcrumb: 'Unternehmung bearbeiten' },
    canActivate: [AuthGuard],
  },
  {
    path: 'take-aways/:activityId',
    component: TakeAwaysComponent,
    data: { breadcrumb: 'Take-Aways' },
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { breadcrumb: 'Login' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { breadcrumb: 'Registrierung' },
    canActivate: [AuthGuard],
  },
  {
    path: 'logout',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '/',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent },
];
