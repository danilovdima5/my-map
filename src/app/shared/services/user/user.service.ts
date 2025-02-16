import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly __user$ = new BehaviorSubject<User | null>(null);

  get user$(): Observable<User | null> {
    return this.__user$.asObservable();
  }

  set user(value: User) {
    this.__user$.next(value);
  }
}
