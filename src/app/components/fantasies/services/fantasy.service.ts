import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FantasyItem } from '../models/fantasy.model';

@Injectable({
  providedIn: 'root'
})
export class FantasyService {

  #http = inject(HttpClient);

  baseUrl = 'http://localhost:8080/fantasy';

  constructor() { }

  /**
   * Retrieves the list of public fantasy items.
   * @returns - An Observable that emits the list of public fantasy items.
   */
  getPublicList(): Observable<FantasyItem[]> {
    return this.#http.get(`${this.baseUrl}/public`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Retrieves the list of private fantasy items for a specific user.
   * @param userId - The ID of the user.
   * @returns - An Observable that emits the list of private fantasy items.
   */
  getPrivateListByUserId(userId: number): Observable<FantasyItem[]> {
    return this.#http.get(`${this.baseUrl}/private?userId=${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Retrieves a fantasy item by its ID.
   * @param id - The ID of the fantasy item.
   * @returns - An Observable that emits the fantasy item.
   */
  getFantasyItemById(id: number): Observable<FantasyItem> {
    return this.#http.get(`${this.baseUrl}?id=${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Creates a new fantasy item.
   * @param item - The fantasy item to create.
   * @returns - An Observable that emits the created fantasy item.
   */
  create(item: FantasyItem): Observable<FantasyItem> {
    return this.#http.post(`${this.baseUrl}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Updates an existing fantasy item.
   * @param item - The fantasy item to update.
   * @returns - An Observable that emits the updated fantasy item.
   */
  update(item: FantasyItem): Observable<FantasyItem> {
    return this.#http.put(`${this.baseUrl}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Deletes a fantasy item by its ID.
   * @param itemId - The ID of the fantasy item to delete.
   * @returns - An Observable that emits a string indicating the result of the deletion.
   */
  delete(itemId: number): Observable<string> {
    return this.#http.delete(`${this.baseUrl}?id=${itemId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Toggles the publish status of a fantasy item.
   * @param item - The fantasy item to update.
   * @param published - The new publish status.
   * @returns - An Observable that emits the updated fantasy item.
   */
  togglePublishFantasies(item: FantasyItem, published: boolean): Observable<FantasyItem> {
    return this.#http.patch(`${this.baseUrl}/togglePublished?id=${item.id}&published=${published}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Sets the done status of a fantasy item.
   * @param item - The fantasy item to update.
   * @returns - An Observable that emits the updated fantasy item.
   */
  setIsDone(item: FantasyItem): Observable<FantasyItem> {
    return this.#http.patch(`${this.baseUrl}/setDone?id=${item.id}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Sets the accepted status of a fantasy item.
   * @param item - The fantasy item to update.
   * @returns - An Observable that emits the updated fantasy item.
   */
  setIsAccepted(item: FantasyItem): Observable<FantasyItem> {
    return this.#http.patch(`${this.baseUrl}/setAccepted?id=${item.id}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Sets the denied status of a fantasy item.
   * @param item - The fantasy item to update.
   * @returns - An Observable that emits the updated fantasy item.
   */
  setIsDenied(item: FantasyItem): Observable<FantasyItem> {
    return this.#http.patch(`${this.baseUrl}/setDenied?id=${item.id}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Shows private accepted fantasy items for a user.
   * @param userId - The ID of the user.
   * @returns - An Observable that emits the list of accepted fantasy items.
   */
  showPrivateAccepted(userId: number): Observable<FantasyItem[]> {
    return this.#http.get(`${this.baseUrl}/byAccepted?userId=${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Shows private denied fantasy items for a user.
   * @param userId - The ID of the user.
   * @returns - An Observable that emits the list of denied fantasy items.
   */
  showPrivateDenied(userId: number): Observable<FantasyItem[]> {
    return this.#http.get(`${this.baseUrl}/byDenied?userId=${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Shows private done fantasy items for a user.
   * @param userId - The ID of the user.
   * @returns - An Observable that emits the list of done fantasy items.
   */
  showPrivateDone(userId: number): Observable<FantasyItem[]> {
    return this.#http.get(`${this.baseUrl}/byDone?userId=${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
