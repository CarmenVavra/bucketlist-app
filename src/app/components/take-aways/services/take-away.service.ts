import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActivityItemWithTakeAways, TakeAway } from '../models/take-aways.model';

@Injectable({
  providedIn: 'root'
})
export class TakeAwayService {

  #http = inject(HttpClient);

  baseUrl = 'http://localhost:8080/takeaway';

  constructor() { }

  getByUserId(id: number): Observable<TakeAway[]> {
    return this.#http.get(`${this.baseUrl}/user?userId=${id}`).pipe(
      map((res: any) => {
        return res;
        // return this.transformToCheckboxItems(res['takeaways']);
      })
    );
  }

  getByUserIdAndActivityId(userId: number, activityId: number): Observable<TakeAway[]> {
    console.log('in getByUserIdAndActivityId activityId, userId', activityId, userId);
    return this.#http.get(`${this.baseUrl}/activity/byActivityId?activityId=${activityId}`).pipe(
      map((res: any) => {
        console.log('res', res);
        return res;
        // return this.transformToCheckboxItems(res['takeaways']);
      })
    );
  }

  getById(id: number): Observable<TakeAway> {
    return this.#http.get(`${this.baseUrl}?id=${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // create(item: ActivityItemWithTakeAways): Observable<TakeAway> {
  //   console.log('in create item', item);

  //   return this.#http.post(`${this.baseUrl}/create`, item).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  create(item: TakeAway, activityId: number): Observable<TakeAway> {
    console.log('in create item', item);

    return this.#http.post(`${this.baseUrl}/create?activityId=${activityId}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(item: TakeAway): Observable<TakeAway> {
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

  check(item: ActivityItemWithTakeAways): Observable<ActivityItemWithTakeAways> {
    return this.#http.patch(`${this.baseUrl}/activity/setChecked?id=${item.id}&isChecked=${item.isChecked}`, item).pipe(
      map((res: any) => {
        return res;
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
