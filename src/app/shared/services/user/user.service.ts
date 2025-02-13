import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly __user$ = new BehaviorSubject<User | null>(null);

  get user$(): Observable<User | null> {
    return this.__user$.asObservable();
  }

  get user(): User | null {
    return this.__user$.getValue();
  }

  set user(value: User) {
    this.__user$.next(value);
  }
}
