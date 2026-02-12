import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BucketListItem } from '../models/bucket-list.model';

@Injectable({
  providedIn: 'root'
})
export class BucketListService {

  #http = inject(HttpClient);

  baseUrl = 'http://localhost/carToni_BucketList_Backend/bucketList';

  constructor() { }

  getAll(): Observable<BucketListItem[]> {
    return this.#http.get(`${this.baseUrl}/list`).pipe(
      map((res: any) => {
        return res['bucketlists'];
      })
    );
  }

  getAllByUserId(userId: number): Observable<BucketListItem[]> {
    return this.#http.get(`${this.baseUrl}/listByUserId?userId=${userId}`).pipe(
      map((res: any) => {
        return res['bucketlists'];
      })
    );
  }

  getBucketListItemById(id: number): Observable<BucketListItem> {
    return this.#http.get(`${this.baseUrl}/listItemById?id=${id}`).pipe(
      map((res: any) => {
        console.log('res bucketlist', res['bucketListItem']);
        return res['bucketListItem'];
      })
    );
  }

  // mapFormToItem(form: FormGroup): Observable<BucketListItem> {
  //   return this.#authService.searchByEmail(localStorage.getItem('email')!).pipe(
  //     map(users => {
  //       return {
  //         title: form.get('title')?.value,
  //         text: form.get('text')?.value,
  //         headline: form.get('headline')?.value,
  //         creatorId: Number(users[0]?.id),
  //         creator: users[0]?.name,
  //       } as BucketListItem;
  //     })
  //   );
  // }

  create(item: BucketListItem): Observable<BucketListItem> {
    return this.#http.post(`${this.baseUrl}/create`, { data: item }).pipe(
      map((res: any) => {
        return res['bucketList'];
      })
    );
  }

  update(item: BucketListItem): Observable<BucketListItem> {
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

  togglePublishBucketList(id: number, published: boolean): Observable<BucketListItem> {
    return this.#http.put(`${this.baseUrl}/publish`, { id: id, published: published }).pipe(
      map((res: any) => {
        return res['bucketList'];
      })
    );
  }

  setIsDone(id: number): Observable<BucketListItem> {
    return this.#http.put(`${this.baseUrl}/done`, { id: id }).pipe(
      map((res: any) => {
        return res['bucketList'];
      })
    );
  }

  setIsAccepted(id: number): Observable<BucketListItem> {
    return this.#http.put(`${this.baseUrl}/accepted`, { id: id }).pipe(
      map((res: any) => {
        return res['bucketList'];
      })
    );
  }

  setIsDenied(id: number): Observable<BucketListItem> {
    return this.#http.put(`${this.baseUrl}/denied`, { id: id }).pipe(
      map((res: any) => {
        console.log('res', res['bucketList']);
        return res['bucketList'];
      })
    );
  }

  showAccepted(): Observable<BucketListItem[]> {
    return this.#http.get(`${this.baseUrl}/listByAccepted`).pipe(
      map((res: any) => {
        return res['bucketLists'];
      })
    );
  }

  showPrivateAccepted(userId: number): Observable<BucketListItem[]> {
    return this.#http.get(`${this.baseUrl}/listByPrivateAccepted?userId=${userId}`).pipe(
      map((res: any) => {
        return res['bucketLists'];
      })
    );
  }

  showDenied(): Observable<BucketListItem[]> {
    return this.#http.get(`${this.baseUrl}/listByDenied`).pipe(
      map((res: any) => {
        return res['bucketLists'];
      })
    );
  }

  showPrivateDenied(userId: number): Observable<BucketListItem[]> {
    return this.#http.get(`${this.baseUrl}/listByPrivateDenied?userId=${userId}`).pipe(
      map((res: any) => {
        return res['bucketLists'];
      })
    );
  }

  showDone(): Observable<BucketListItem[]> {
    return this.#http.get(`${this.baseUrl}/listByPrivateDone`).pipe(
      map((res: any) => {
        return res['bucketLists'];
      })
    );
  }

  showPrivateDone(userId: number): Observable<BucketListItem[]> {
    return this.#http.get(`${this.baseUrl}/listByPrivateDone?userId=${userId}`).pipe(
      map((res: any) => {
        return res['bucketLists'];
      })
    );
  }
}
