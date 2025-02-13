import { inject } from '@angular/core';
import { GuardResult, MaybeAsync } from '@angular/router';
import { UserService } from '@shared/services/user/user.service';
import { map } from 'rxjs/operators';

export const isAuthenticated = (): MaybeAsync<GuardResult> => {
  return inject(UserService).user$.pipe(map(Boolean));
};

export const isNotAuthenticated = (): MaybeAsync<GuardResult> => {
  return inject(UserService).user$.pipe(map((value) => !value));
};
