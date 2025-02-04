import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe(AppComponent.name, () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should render h1 Hello, world', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const queryH1 = compiled.querySelector('h1');

    expect(queryH1?.textContent).toContain('Hello, world');
  });
});
