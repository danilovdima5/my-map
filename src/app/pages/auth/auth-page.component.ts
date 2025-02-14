import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { Breakpoints } from '@angular/cdk/layout';
import { finalize, map } from 'rxjs/operators';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { LayoutService } from '@shared/services/layout/layout.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatButton } from '@angular/material/button';
import { NgTemplateOutlet } from '@angular/common';
import { AuthPageService } from './auth-page.service';
import { bound } from '@shared/helpers/bound/bound';
import { FirebaseError } from 'firebase/app';
import { GlobalLoaderComponent } from '@shared/components/global-loader/global-loader.component';

type SigningForm = FormGroup<{
  email: FormControl<string>;
  password: FormControl<string>;
}>;

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  imports: [
    MatGridList,
    MatGridTile,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    NgTemplateOutlet,
    GlobalLoaderComponent
  ],
  host: {
    class: 'page',
  },
  providers: [AuthPageService]
})
export class AuthPageComponent {
  private readonly layoutService = inject(LayoutService);

  private readonly authPageService = inject(AuthPageService);

  private readonly destroyRef = inject(DestroyRef);

  private readonly snackBar = inject(MatSnackBar);

  readonly signInInProgress = signal(false);
  readonly signUpInProgress = signal(false);

  readonly cols = toSignal(
    this.layoutService.breakpoints$.pipe(
      map(({ breakpoints }) => {
        if (
          breakpoints[Breakpoints.Medium] ||
          breakpoints[Breakpoints.Large] ||
          breakpoints[Breakpoints.XLarge]
        ) {
          return 2;
        }

        return 1;
      })
    )
  );

  readonly signInForm = AuthPageComponent.getForm();
  readonly signUpForm = AuthPageComponent.getForm();

  @bound
  signIn(): void {
    const { email, password } = this.signInForm.getRawValue();

    this.signUpInProgress.set(true);

    this.makeRequest(
      [email, password, 'signIn'],
      () => {
        this.signInInProgress.set(false);
        this.signInForm.reset();
      },
    );
  }

  @bound
  signUp(): void {
    const { email, password } = this.signUpForm.getRawValue();

    this.signUpInProgress.set(true);

    this.makeRequest(
      [email, password, 'signUp'],
      () => {
        this.signUpInProgress.set(false);
        this.signUpForm.reset();
      },
    );
  }

  private makeRequest(
    [email, password, method]: Parameters<typeof this.authPageService.makeRequest>,
    onComplete: () => void
  ): void {
    this.authPageService.makeRequest(email, password, method).pipe(
      finalize(() => onComplete()),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: () => {
        this.showSnack('Successfully completed', 'Okay');
      },
      error: (error: FirebaseError) => {
        this.showSnack(error.code.split('/')[1].split('-').join(' '), 'Okay');
      }
    })
  }

  static getForm(): SigningForm {
    const fb = inject(FormBuilder);

    const form = fb.group({
      email: fb.control('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: fb.control('', {
        validators: [Validators.required, Validators.minLength(6)],
        nonNullable: true,
      }),
    });

    return form;
  }

  private showSnack(title: string, button: string): void {
    this.snackBar.open(title, button, {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  }
}
