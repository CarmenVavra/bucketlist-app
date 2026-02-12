import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { AuthGuard } from './components/auth/services/auth-guard';
import { MAT_DATE_LOCALE } from '@angular/material/core';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    AuthGuard,
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },

  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
