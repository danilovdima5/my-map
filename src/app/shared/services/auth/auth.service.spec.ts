import { Auth, initializeAuth, provideAuth, UserCredential } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import firebaseOptions from '../../../../../firebase.options';


describe(AuthService.name, () => {
  let service: AuthService;

  beforeEach(() => {
    const firebaseApp = initializeApp(firebaseOptions);

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideFirebaseApp(() => firebaseApp),
        provideAuth(() => initializeAuth(firebaseApp)),
        AuthService
      ],
    }).compileComponents();

    service = TestBed.inject(AuthService);
  });

  describe('signIn', () => {
    it('should call and return Observable from signInFn', (done) => {
      const expectedResult = {} as UserCredential;

      const signInFnSpy = jasmine.createSpy('signInFnSpy', service['signInFn']).and.returnValue(Promise.resolve(expectedResult));

      const mockAuth = {} as Auth;

      Object.assign(service, {
        signInFn: signInFnSpy,
        auth: mockAuth
      });

      const mockEmail = 'aksfmaksmfafmaf';
      const mockPassword = 'amsapmspvomwom';

      service.signIn(mockEmail, mockPassword).subscribe((result) => {
        expect(result).toBe(expectedResult);

        expect(signInFnSpy).toHaveBeenCalledOnceWith(mockAuth, mockEmail, mockPassword);

        done();
      });
    });
  });

  describe('signUp', () => {
    it('should call and return Observable from signUpFn', (done) => {
      const expectedResult = {} as UserCredential;

      const signUpFnSpy = jasmine.createSpy('signUpFnSpy', service['signUpFn']).and.returnValue(Promise.resolve(expectedResult));

      const mockAuth = {} as Auth;

      Object.assign(service, {
        signInFn: signUpFnSpy,
        auth: mockAuth
      });

      const mockEmail = 'aksfmaksmfafmaf';
      const mockPassword = 'amsapmspvomwom';

      service.signIn(mockEmail, mockPassword).subscribe((result) => {
        expect(result).toBe(expectedResult);

        expect(signUpFnSpy).toHaveBeenCalledOnceWith(mockAuth, mockEmail, mockPassword);

        done();
      });
    });
  });
});
