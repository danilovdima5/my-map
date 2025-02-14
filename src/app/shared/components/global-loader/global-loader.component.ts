import { Component } from '@angular/core';

import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-global-loader',
  template: '<mat-spinner class="centered" />',
  imports: [
    MatProgressSpinner
  ],
  host: {
    class: 'd-block full-size centered bg-secondary half-transparent'
  }
})
export class GlobalLoaderComponent {
}
