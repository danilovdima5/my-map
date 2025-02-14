import { inject, Injectable } from '@angular/core';
import { AuthService } from '@shared/services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthPageService {
  private readonly authService = inject(AuthService);

  public makeRequest(
    email: string,
    password: string,
    method: keyof AuthService
  ): Observable<boolean> {
    return this.authService[method](email, password).pipe(
      map(() => true)
    );
  }
}
