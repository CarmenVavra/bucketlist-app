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

  getAllByUserId(userId: number): Observable<NoteItem[]> {
    return this.#http.get(`${this.baseUrl}/user?userId=${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getById(id: number): Observable<NoteItem> {
    return this.#http.get(`${this.baseUrl}?id=${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  create(item: NoteItem): Observable<NoteItem> {
    console.log('item note create', item);
    return this.#http.post(`${this.baseUrl}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(item: NoteItem): Observable<NoteItem> {
    return this.#http.put(`${this.baseUrl}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  delete(itemId: number): Observable<string> {
    return this.#http.delete(`${this.baseUrl}?id=${itemId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
