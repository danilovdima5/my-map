import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe(AppComponent.name, () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();
  });

  it('should render router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const queryRouterOutlet = compiled.querySelectorAll('router-outlet');

    expect(queryRouterOutlet.length).toBe(1);
  });
});
