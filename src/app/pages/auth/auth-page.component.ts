import { Component, inject } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

import { LayoutService } from '@shared/services/layout/layout.service';

import { AuthPageService } from './auth-page.service';
import { AuthPageActionComponent } from './action/auth-page-action.component';

@Component({
  selector: 'app-auth-page',
  template: `
    <mat-grid-list [cols]="cols()" rowHeight="fit" class="h-100">
      <mat-grid-tile>
        <app-auth-page-action class="w-75" title="Sign In" action="signIn" />
      </mat-grid-tile>

      <mat-grid-tile>
        <app-auth-page-action class="w-75" title="Sign Up" action="signUp" />
      </mat-grid-tile>
    </mat-grid-list>
  `,
  imports: [
    MatGridList,
    MatGridTile,
    AuthPageActionComponent
  ],
  host: {
    class: 'page',
  },
  providers: [AuthPageService]
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
}
