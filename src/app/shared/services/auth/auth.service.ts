import { Injectable } from '@angular/core';
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = getAuth();

  signIn(email: string, password: string): Observable<UserCredential> {
    const request = signInWithEmailAndPassword(this.auth, email, password);

    return from(request);
  }

  signUp(email: string, password: string): Observable<UserCredential> {
    const request = createUserWithEmailAndPassword(this.auth, email, password);

    return from(request);
  }
}
