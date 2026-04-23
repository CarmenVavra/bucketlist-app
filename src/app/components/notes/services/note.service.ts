import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NoteItem } from '../models/notes.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  #http = inject(HttpClient);

  baseUrl = 'http://localhost:8080/note';

  constructor() { }

  /**
   * Retrieves all note items for a specific user by their user ID.
   * @param userId - The ID of the user whose note items are to be retrieved.
   * @returns An Observable that emits an array of NoteItem objects associated with the specified user ID.
   * The method makes an HTTP GET request to the backend API endpoint, passing the user ID as a query parameter.
   */
  getAllByUserId(userId: number): Observable<NoteItem[]> {
    return this.#http.get(`${this.baseUrl}/user?userId=${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Retrieves a note item by its ID.
   * @param id - The ID of the note item to retrieve.
   * @returns An Observable that emits the NoteItem object with the specified ID.
   * The method makes an HTTP GET request to the backend API endpoint, passing the ID as a query parameter.
   */
  getById(id: number): Observable<NoteItem> {
    return this.#http.get(`${this.baseUrl}?id=${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Creates a new note item.
   * @param item - The NoteItem object to create.
   * @returns An Observable that emits the created NoteItem object.
   * The method makes an HTTP POST request to the backend API endpoint with the note item data.
   */
  create(item: NoteItem): Observable<NoteItem> {
    console.log('item note create', item);
    return this.#http.post(`${this.baseUrl}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Updates an existing note item.
   * @param item - The NoteItem object to update.
   * @returns An Observable that emits the updated NoteItem object.
   * The method makes an HTTP PUT request to the backend API endpoint with the note item data.
   */
  update(item: NoteItem): Observable<NoteItem> {
    return this.#http.put(`${this.baseUrl}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Deletes a note item by its ID.
   * @param itemId - The ID of the note item to delete.
   * @returns An Observable that emits a string indicating the result of the deletion.
   * The method makes an HTTP DELETE request to the backend API endpoint, passing the ID as a query parameter.
   */
  delete(itemId: number): Observable<string> {
    return this.#http.delete(`${this.baseUrl}?id=${itemId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
