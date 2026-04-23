import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActivityItem } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {


  #http = inject(HttpClient);

  // baseUrl = 'http://localhost/carToni_BucketList_Backend/activities';
  baseUrl = 'http://localhost:8080/activity';

  constructor() { }

  getByUserId(id: number): Observable<ActivityItem[]> {
    return this.#http.get(`${this.baseUrl}/user?userId=${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getById(id: number): Observable<ActivityItem> {
    return this.#http.get(`${this.baseUrl}?id=${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  create(item: ActivityItem): Observable<ActivityItem> {
    console.log('item', item);
    return this.#http.post(`${this.baseUrl}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(item: ActivityItem): Observable<ActivityItem> {
    return this.#http.put(`${this.baseUrl}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  delete(id: number): Observable<string> {
    return this.#http.delete(`${this.baseUrl}?id=${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  formatDateForBackend(date: Date): string {
    if (!date.getDate()) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatTimeForBackend(time: Date): string {
    if (!time.getTime()) return '00:00:00';
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}:00`;
  }
}
