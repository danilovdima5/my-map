import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { AuthActions } from '../auth-page.types';
import { AuthPageService } from '../auth-page.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FirebaseError } from '@angular/fire/app';
import { ReactiveFormsModule } from '@angular/forms';
import { getAuthForm } from '../auth-page.utils';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { GlobalLoaderComponent } from '@shared/components/global-loader/global-loader.component';
import { Router } from '@angular/router';
import { PAGES_PATHS } from '@pages/paths';

@Component({
  selector: 'app-auth-page-action',
  templateUrl: './auth-page-action.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    GlobalLoaderComponent
  ]
})
export class AuthPageActionComponent {
  readonly title = input.required<string>();
  readonly action = input.required<AuthActions>();

  private readonly authPageService = inject(AuthPageService);

  private readonly destroyRef = inject(DestroyRef);

  private readonly router = inject(Router);

  private readonly snackBar = inject(MatSnackBar);

  readonly isRequestInProgress = signal(false);

  readonly form = getAuthForm();

  onSubmit(): void {
    const { email, password } = this.form.getRawValue();

    this.makeRequest(
      [email, password, this.action()],
    );
  }

  private makeRequest(
    [email, password, method]: Parameters<typeof this.authPageService.makeRequest>
  ): void {
    this.isRequestInProgress.set(true);

    this.authPageService.makeRequest(email, password, method).pipe(
      finalize(() => {
        this.isRequestInProgress.set(false);

        this.form.reset();
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: () => {
        this.router.navigate([PAGES_PATHS.MAIN]);

        this.showSnack(`${this.action()} successfully completed`, 'Okay');
      },
      error: (error: FirebaseError) => {
        this.showSnack(error.code.split('/')[1].split('-').join(' '), 'Okay');
      }
    })
  }

  private showSnack(title: string, button: string): void {
    this.snackBar.open(title, button, {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  }
}
