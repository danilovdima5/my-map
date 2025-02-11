import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly breakpoints$ = this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
    Breakpoints.Handset,
    Breakpoints.Tablet,
    Breakpoints.Web,
    Breakpoints.HandsetPortrait,
    Breakpoints.TabletPortrait,
    Breakpoints.WebPortrait,
    Breakpoints.HandsetLandscape,
    Breakpoints.TabletLandscape,
    Breakpoints.WebLandscape,
  ]);
}
