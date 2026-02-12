import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActivityItem } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {


  #http = inject(HttpClient);

  baseUrl = 'http://localhost/carToni_BucketList_Backend/activities';

  constructor() { }

  getByUserId(id: number): Observable<ActivityItem[]> {
    return this.#http.get(`${this.baseUrl}/listByUserId?id=${id}`).pipe(
      map((res: any) => {
        return res['activities'];
      })
    );
  }

  getById(id: number): Observable<ActivityItem> {
    return this.#http.get(`${this.baseUrl}/getById?id=${id}`).pipe(
      map((res: any) => {
        return res['activity'];
      })
    );
  }

  create(item: ActivityItem): Observable<ActivityItem> {
    return this.#http.post(`${this.baseUrl}/create`, { data: item }).pipe(
      map((res: any) => {
        return res['activity'];
      })
    );
  }

  update(item: ActivityItem): Observable<ActivityItem> {
    return this.#http.put(`${this.baseUrl}/update`, { data: item }).pipe(
      map((res: any) => {
        return res['activity'];
      })
    );
  }

  delete(id: number): Observable<string> {
    return this.#http.delete(`${this.baseUrl}/delete?id=${id}`).pipe(
      map((res: any) => {
        return res['message'];
      })
    );
  }

  formatDateForBackend(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatTimeForBackend(time: Date): string {
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}:00`;
  }
}
