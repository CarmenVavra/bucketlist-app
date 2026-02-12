import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NoteItem } from '../models/notes.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  #http = inject(HttpClient);

  baseUrl = 'http://localhost/carToni_BucketList_Backend/notes';

  constructor() { }

  getAllByUserId(userId: number): Observable<NoteItem[]> {
    return this.#http.get(`${this.baseUrl}/listByUserId?userId=${userId}`).pipe(
      map((res: any) => {
        return res['notes'];
      })
    );
  }

  getById(id: number): Observable<NoteItem> {
    return this.#http.get(`${this.baseUrl}/getById?id=${id}`).pipe(
      map((res: any) => {
        return res['noteItem'];
      })
    );
  }

  create(item: NoteItem): Observable<NoteItem> {
    return this.#http.post(`${this.baseUrl}/create`, { data: item }).pipe(
      map((res: any) => {
        return res['noteItem'];
      })
    );
  }

  update(item: NoteItem): Observable<NoteItem> {
    return this.#http.put(`${this.baseUrl}/update`, { data: item }).pipe(
      map((res: any) => {
        return res['noteItem'];
      })
    );
  }

  delete(itemId: number): Observable<string> {
    return this.#http.delete(`${this.baseUrl}/delete?itemId=${itemId}`).pipe(
      map((res: any) => {
        return res['message'];
      })
    );
  }
}
