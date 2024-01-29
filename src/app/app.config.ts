import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CounterStore } from './counter-store';
import { CounterService } from './counter.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), CounterStore, CounterService]
};
