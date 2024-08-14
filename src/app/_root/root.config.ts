import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { ROOT_ROUTES } from './root.routes';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

export const ROOT_CONFIG: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(ROOT_ROUTES, withInMemoryScrolling({
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })),
    provideHttpClient(),
    {
      provide: JwtHelperService,
      useClass: JwtHelperService
    },
    { 
      provide: JWT_OPTIONS,
      useValue: {
        
      }
    }
  ]
};