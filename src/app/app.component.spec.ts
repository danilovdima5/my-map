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

  it('should render h1 Hello, world', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const queryH1 = compiled.querySelector('h1');

    expect(queryH1?.textContent).toContain('Hello, world');
  });
});
