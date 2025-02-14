import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { routes } from './app.routes';

import firebaseOptions from '../../firebase.options';
import { provideAuth, initializeAuth } from '@angular/fire/auth';

const firebaseApp = initializeApp(firebaseOptions);

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimations(),
    provideFirebaseApp(() => firebaseApp),
    provideAuth(() => initializeAuth(firebaseApp))
  ],
};
