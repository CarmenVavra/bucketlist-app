import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { BucketListItem } from '../models/bucket-list.model';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class BucketListService {

  #http = inject(HttpClient);
  readonly dialog = inject(MatDialog);

  baseUrl = 'http://localhost:8080/bucketlist';

  constructor() { }

  getAll(): Observable<BucketListItem[]> {
    return this.#http.get(`${this.baseUrl}/public`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getAllByUserId(userId: number): Observable<BucketListItem[]> {
    return this.#http.get(`${this.baseUrl}/private?userId=${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getBucketListItemById(id: number): Observable<BucketListItem> {
    return this.#http.get(`${this.baseUrl}?id=${id}`).pipe(
      map((res: any) => {
        return res;
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
    return this.#http.post(`${this.baseUrl}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(item: BucketListItem): Observable<BucketListItem> {
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

  togglePublishBucketList(item: BucketListItem, published: boolean): Observable<BucketListItem> {
    return this.#http.patch(`${this.baseUrl}/togglePublished?id=${item.id}&published=${published}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  setIsDone(item: BucketListItem): Observable<BucketListItem> {
    return this.#http.patch(`${this.baseUrl}/setDone?id=${item.id}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  setIsAccepted(item: BucketListItem): Observable<BucketListItem> {
    return this.#http.patch(`${this.baseUrl}/setAccepted?id=${item.id}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  setIsDenied(item: BucketListItem): Observable<BucketListItem> {
    return this.#http.patch(`${this.baseUrl}/setDenied?id=${item.id}`, item).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // showAccepted(): Observable<BucketListItem[]> {
  //   return this.#http.get(`${this.baseUrl}/listByAccepted`).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  showPrivateAccepted(userId: number): Observable<BucketListItem[]> {
    return this.#http.get(`${this.baseUrl}/byAccepted?userId=${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // showDenied(): Observable<BucketListItem[]> {
  //   return this.#http.get(`${this.baseUrl}/listByDenied`).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  showPrivateDenied(userId: number): Observable<BucketListItem[]> {
    return this.#http.get(`${this.baseUrl}/byDenied?userId=${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // showDone(): Observable<BucketListItem[]> {
  //   return this.#http.get(`${this.baseUrl}/listByPrivateDone`).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  showPrivateDone(userId: number): Observable<BucketListItem[]> {
    return this.#http.get(`${this.baseUrl}/byDone?userId=${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


}
