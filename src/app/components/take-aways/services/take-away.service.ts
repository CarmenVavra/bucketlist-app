import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActivityItemWithTakeAways, TakeAway, TakeawayWithChecked } from '../models/take-aways.model';

@Injectable({
  providedIn: 'root'
})
export class TakeAwayService {

  #http = inject(HttpClient);

  baseUrl = 'http://localhost:8080/takeaway';

  constructor() { }

  /**
   * Gets takeaways for a specific user by user id from the backend
   * @param id - user id to get takeaways for
   * @returns - array of takeaways  
   */
  getByUserId(id: number): Observable<TakeAway[]> {
    return this.#http.get(`${this.baseUrl}/user?userId=${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Gets takeaways for a specific activity by activity id from the backend
   * @param activityId - activity id to get takeaways for
   * @returns - array of takeaways with checked status for the current user
   */
  getByActivityId(activityId: number): Observable<TakeawayWithChecked[]> {
    let takeawaysWithChecked: TakeawayWithChecked[] = [];
    return this.#http.get(`${this.baseUrl}/activity/byActivityId?activityId=${activityId}`).pipe(
      map((res: any) => {
        res.forEach((takeaway: any) => {
          takeawaysWithChecked.push({
            id: takeaway.id,
            description: takeaway.description,
            isChecked: takeaway.checked,
            userId: takeaway.userId,
            activityId: takeaway.activityId
          });
        });
        return takeawaysWithChecked;
      })
    );
  }

  /**
   * Gets a takeaway by its id from the backend
   * @param id - id of the takeaway to get
   * @returns - takeaway with the specified id
   */
  getById(id: number): Observable<TakeAway> {
    return this.#http.get(`${this.baseUrl}?id=${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Creates a new takeaway for a specific activity
   * @param item - takeaway to create
   * @param activityId - id of the activity to associate the takeaway with
   * @returns - created takeaway
   */
  create(item: TakeAway, activityId: number): Observable<TakeAway> {
    return this.#http.post(`${this.baseUrl}/create?activityId=${activityId}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Updates an existing takeaway
   * @param item - takeaway to update
   * @returns - updated takeaway
   */
  update(item: TakeAway): Observable<TakeAway> {
    return this.#http.put(`${this.baseUrl}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Deletes a takeaway by its id
   * @param id - id of the takeaway to delete
   * @returns - confirmation message
   */
  delete(id: number): Observable<string> {
    return this.#http.delete(`${this.baseUrl}?id=${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Checks or unchecks a takeaway for a specific activity by updating its checked status in the backend
   * @param item - takeaway with updated checked status to update in the backend
   * @returns - updated activity item with takeaways
   */
  check(item: any): Observable<ActivityItemWithTakeAways> {
    return this.#http.patch(`${this.baseUrl}/activity/setChecked?activityId=${item.activityId}&takeawayId=${item.takeAwayId}&isChecked=${item.isChecked}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
