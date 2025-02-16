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

  private readonly signInFn = signInWithEmailAndPassword;
  private readonly signUpFn = createUserWithEmailAndPassword;

  signIn(email: string, password: string): Observable<UserCredential> {
    const request = this.signInFn(this.auth, email, password);

    return from(request);
  }

  signUp(email: string, password: string): Observable<UserCredential> {
    const request = this.signUpFn(this.auth, email, password);

    return from(request);
  }
}
