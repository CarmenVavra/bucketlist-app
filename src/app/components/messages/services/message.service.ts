import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MessageItem } from '../models/message.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  #http = inject(HttpClient);

  baseUrl = 'http://localhost/carToni_BucketList_Backend/messages';

  constructor() { }


  getAllReceivedByUserIdRecipient(id: number): Observable<MessageItem[]> {
    return this.#http.get(`${this.baseUrl}/listReceivedByUserId?userId=${id}`).pipe(
      map((res: any) => {
        return res['messages'];
      })
    );
  }

  getAllSentByUserIdRecipient(id: number): Observable<MessageItem[]> {
    return this.#http.get(`${this.baseUrl}/listSentByUserId?userId=${id}`).pipe(
      map((res: any) => {
        return res['messages'];
      })
    );
  }

  getAllAnsweredByUserIdRecipient(id: number): Observable<MessageItem[]> {
    return this.#http.get(`${this.baseUrl}/listAnsweredByUserId?userId=${id}`).pipe(
      map((res: any) => {
        return res['messages'];
      })
    );
  }

  getAllDraftByUserId(id: number) {
    return this.#http.get(`${this.baseUrl}/listDraftByUserId?userId=${id}`).pipe(
      map((res: any) => {
        return res['messages'];
      })
    );
  }

  getMessageById(id: number): Observable<MessageItem> {
    return this.#http.get(`${this.baseUrl}/messageById?id=${id}`).pipe(
      map((res: any) => {
        return res['message'];
      })
    );
  }

  create(item: MessageItem): Observable<MessageItem> {
    return this.#http.post(`${this.baseUrl}/create`, { data: item }).pipe(
      map((res: any) => {
        return res['message'];
      })
    );
  }

  update(item: MessageItem): Observable<MessageItem> {
    return this.#http.put(`${this.baseUrl}/update`, { data: item }).pipe(
      map((res: any) => {
        return res['message'];
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

  reply(replyItem: MessageItem, messageItem: MessageItem): Observable<MessageItem> {
    console.log('replyItem', replyItem);
    console.log('messageItem', messageItem);
    return this.#http.post(`${this.baseUrl}/replyMessage`, { reply: replyItem, received: messageItem }).pipe(
      map((res: any) => {
        return res['message'];
      })
    );
  }
}
