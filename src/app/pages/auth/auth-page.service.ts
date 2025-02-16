import { inject, Injectable } from '@angular/core';
import { AuthService } from '@shared/services/auth/auth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthActions } from './auth-page.types';
import { UserService } from '@shared/services/user/user.service';

@Injectable()
export class AuthPageService {
  private readonly authService = inject(AuthService);

  private readonly userService = inject(UserService);

  public makeRequest(
    email: string,
    password: string,
    method: AuthActions
  ): Observable<boolean> {
    return this.authService[method](email, password).pipe(
      tap((response) => {
        this.userService.user = response.user;
      }),
      map(() => true)
    );
  }
}
