import { ApplicationConfig, NgZone } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [{
    provide: NgZone,
    useValue: (window as any).ngZone
  }]
};
