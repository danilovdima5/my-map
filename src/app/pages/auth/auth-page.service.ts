import { inject, Injectable } from '@angular/core';
import { AuthService } from '@shared/services/auth/auth.service';
import { UserService } from '@shared/services/user/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AuthPageService {
  private readonly authService = inject(AuthService);

  private readonly userService = inject(UserService);

  public makeRequest(
    email: string,
    password: string,
    method: keyof AuthService
  ): Observable<boolean> {
    return this.authService[method](email, password).pipe(
      tap((userCredential) => {
        this.userService.user = userCredential.user;
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }
}
