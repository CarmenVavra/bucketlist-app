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

  getPublicList(): Observable<FantasyItem[]> {
    return this.#http.get(`${this.baseUrl}/public`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getPrivateListByUserId(userId: number): Observable<FantasyItem[]> {
    return this.#http.get(`${this.baseUrl}/private?userId=${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getFantasyItemById(id: number): Observable<FantasyItem> {
    return this.#http.get(`${this.baseUrl}?id=${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // mapFormToItem(form: FormGroup): Observable<FantasyItem> {
  //   return this.#authService.searchByEmail(localStorage.getItem('email')!).pipe(
  //     map(users => {
  //       return {
  //         title: form.get('title')?.value,
  //         text: form.get('text')?.value,
  //         headline: form.get('headline')?.value,
  //         creatorId: Number(users[0]?.id),
  //         creator: users[0]?.name,
  //       } as FantasyItem;
  //     })
  //   );
  // }

  create(item: FantasyItem): Observable<FantasyItem> {
    return this.#http.post(`${this.baseUrl}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(item: FantasyItem): Observable<FantasyItem> {
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

  togglePublishFantasies(item: FantasyItem, published: boolean): Observable<FantasyItem> {
    return this.#http.patch(`${this.baseUrl}/togglePublished?id=${item.id}&published=${published}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  setIsDone(item: FantasyItem): Observable<FantasyItem> {
    return this.#http.patch(`${this.baseUrl}/setDone?id=${item.id}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  setIsAccepted(item: FantasyItem): Observable<FantasyItem> {
    return this.#http.patch(`${this.baseUrl}/setAccepted?id=${item.id}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  setIsDenied(item: FantasyItem): Observable<FantasyItem> {
    return this.#http.patch(`${this.baseUrl}/setDenied?id=${item.id}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  showPrivateAccepted(userId: number): Observable<FantasyItem[]> {
    return this.#http.get(`${this.baseUrl}/byAccepted?userId=${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  showPrivateDenied(userId: number): Observable<FantasyItem[]> {
    return this.#http.get(`${this.baseUrl}/byDenied?userId=${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  showPrivateDone(userId: number): Observable<FantasyItem[]> {
    return this.#http.get(`${this.baseUrl}/byDone?userId=${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
