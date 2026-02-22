import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActivityItemWithTakeAways, TakeAway } from '../models/take-aways.model';

@Injectable({
  providedIn: 'root'
})
export class TakeAwayService {

  #http = inject(HttpClient);

  baseUrl = 'http://localhost/carToni_BucketList_Backend/takeaways';

  constructor() { }

  getByUserId(id: number): Observable<TakeAway[]> {
    return this.#http.get(`${this.baseUrl}/byUserId?id=${id}`).pipe(
      map((res: any) => {
        return res['takeaways'];
        // return this.transformToCheckboxItems(res['takeaways']);
      })
    );
  }

  getById(id: number): Observable<TakeAway> {
    return this.#http.get(`${this.baseUrl}/getById?id=${id}`).pipe(
      map((res: any) => {
        return res['takeaway'];
      })
    );
  }

  create(item: TakeAway): Observable<TakeAway> {
    return this.#http.post(`${this.baseUrl}/create`, { data: item }).pipe(
      map((res: any) => {
        return res['takeaway'];
      })
    );
  }

  update(item: TakeAway): Observable<TakeAway> {
    return this.#http.put(`${this.baseUrl}/update`, { data: item }).pipe(
      map((res: any) => {
        return res['takeaway'];
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

  check(item: ActivityItemWithTakeAways): Observable<ActivityItemWithTakeAways> {
    console.log('item in service check', item);
    return this.#http.put(`${this.baseUrl}/check`, { data: item }).pipe(
      map((res: any) => {
        return res['takeaway'];
      })
    );
  }

  // private transformToCheckboxItems(takeAways: TakeAway[]): TakeAway[] {
  //   return takeAways.map(takeAway => ({
  //     id: takeAway.id,
  //     label: takeAway.description,
  //     isChecked: takeAway.isChecked,
  //     isFavourite: takeAway.isFavourite
  //   }));
  // }
}
