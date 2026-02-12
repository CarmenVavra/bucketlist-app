import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FantasyItem } from '../models/fantasy.model';

@Injectable({
  providedIn: 'root'
})
export class FantasyService {

  #http = inject(HttpClient);

  baseUrl = 'http://localhost/carToni_BucketList_Backend/fantasies';

  constructor() { }

  getPublicList(): Observable<FantasyItem[]> {
    return this.#http.get(`${this.baseUrl}/publicList`).pipe(
      map((res: any) => {
        return res['fantasies'];
      })
    );
  }

  getPrivateListByUserId(userId: number): Observable<FantasyItem[]> {
    return this.#http.get(`${this.baseUrl}/privateListByUserId?userId=${userId}`).pipe(
      map((res: any) => {
        return res['fantasies'];
      })
    );
  }

  getFantasyItemById(id: number): Observable<FantasyItem> {
    return this.#http.get(`${this.baseUrl}/getById?id=${id}`).pipe(
      map((res: any) => {
        return res['fantasy'];
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
    return this.#http.post(`${this.baseUrl}/create`, { data: item }).pipe(
      map((res: any) => {
        return res['fantasy'];
      })
    );
  }

  update(item: FantasyItem): Observable<FantasyItem> {
    return this.#http.put(`${this.baseUrl}/update`, { data: item }).pipe(
      map((res: any) => {
        return res['bucketList'];
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

  togglePublishBucketList(id: number, published: boolean): Observable<FantasyItem> {
    return this.#http.put(`${this.baseUrl}/publish`, { id: id, published: published }).pipe(
      map((res: any) => {
        return res['bucketList'];
      })
    );
  }

  setIsDone(id: number): Observable<FantasyItem> {
    return this.#http.put(`${this.baseUrl}/done`, { id: id }).pipe(
      map((res: any) => {
        return res['bucketList'];
      })
    );
  }

  setIsAccepted(id: number): Observable<FantasyItem> {
    return this.#http.put(`${this.baseUrl}/accepted`, { id: id }).pipe(
      map((res: any) => {
        return res['bucketList'];
      })
    );
  }

  setIsDenied(id: number): Observable<FantasyItem> {
    return this.#http.put(`${this.baseUrl}/denied`, { id: id }).pipe(
      map((res: any) => {
        console.log('res', res['bucketList']);
        return res['bucketList'];
      })
    );
  }

  showAccepted(): Observable<FantasyItem[]> {
    return this.#http.get(`${this.baseUrl}/listByAccepted`).pipe(
      map((res: any) => {
        return res['bucketLists'];
      })
    );
  }

  showPrivateAccepted(userId: number): Observable<FantasyItem[]> {
    return this.#http.get(`${this.baseUrl}/listByPrivateAccepted?userId=${userId}`).pipe(
      map((res: any) => {
        return res['bucketLists'];
      })
    );
  }

  showDenied(): Observable<FantasyItem[]> {
    return this.#http.get(`${this.baseUrl}/listByDenied`).pipe(
      map((res: any) => {
        return res['bucketLists'];
      })
    );
  }

  showPrivateDenied(userId: number): Observable<FantasyItem[]> {
    return this.#http.get(`${this.baseUrl}/listByPrivateDenied?userId=${userId}`).pipe(
      map((res: any) => {
        return res['bucketLists'];
      })
    );
  }

  showDone(): Observable<FantasyItem[]> {
    return this.#http.get(`${this.baseUrl}/listByPrivateDone`).pipe(
      map((res: any) => {
        return res['bucketLists'];
      })
    );
  }

  showPrivateDone(userId: number): Observable<FantasyItem[]> {
    return this.#http.get(`${this.baseUrl}/listByPrivateDone?userId=${userId}`).pipe(
      map((res: any) => {
        return res['bucketLists'];
      })
    );
  }

}
