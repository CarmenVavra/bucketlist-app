import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AUTH_DATA, LoginUser, RegisterUser } from '../models/auth.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { error } from 'console';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #http = inject(HttpClient);
  #localStorageService = inject(LocalStorageService);

  baseUrl = 'http://localhost:8080/auth';

  private subject = new BehaviorSubject<LoginUser>(null!);
  user$: Observable<LoginUser> = this.subject.asObservable();

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor() {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
    const user = this.#localStorageService.getFromLocalStorage(AUTH_DATA);
    if (user) {
      this.subject.next(JSON.parse(user));
    }
  }

  register(user: RegisterUser): Observable<RegisterUser> {
    return this.#http.post(`${this.baseUrl}`, user).pipe(
      map((res: any) => {
        this.#localStorageService.saveToLocalStorage(AUTH_DATA, JSON.stringify(res));
        this.subject.next(res);
        return res;
      })
    );
  }

  login(user: LoginUser): Observable<RegisterUser> {
    return this.#http.get(`${this.baseUrl}?email=${user.email}&password=${user.password}`).pipe(
      map((res: any) => {
        this.#localStorageService.saveToLocalStorage(AUTH_DATA, JSON.stringify(res));
        this.subject.next(res);
        return res;
      })
    );
  }

  hideNavigation() {
    if (typeof window !== 'undefined') {
      const authData = localStorage.getItem(AUTH_DATA);
      if (authData) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  getStoredUser(): LoginUser {
    const storedUser = this.#localStorageService.getFromLocalStorage(AUTH_DATA);
    if (storedUser) {
      return JSON.parse(storedUser) as LoginUser;
    }
    return null!;
  }

  getRegisteredUsers(): Observable<LoginUser[]> {
    return this.#http.get(`${this.baseUrl}/getUsers`).pipe(
      map((res: any) => {
        return res['users'];
      })
    );
  }

  getUserById(userId: number): Observable<LoginUser> {
    return this.#http.get(`${this.baseUrl}/getByUserId?userId=${userId}`).pipe(
      map((res: any) => {
        return res['user'];
      })
    );
  }
}
