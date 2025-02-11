import { Component, inject } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

import { LayoutService } from '@shared/services/layout/layout.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

import { MatButton } from '@angular/material/button';
import { NgTemplateOutlet } from '@angular/common';

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
  ],
  host: {
    class: 'page',
  },
})
export class AuthPageComponent {
  private readonly layoutService = inject(LayoutService);

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

    form.disable();

    return form;
  }
}
