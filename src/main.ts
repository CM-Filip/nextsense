/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { RootComponent } from './app/_root/root.component';

import { ROOT_CONFIG } from './app/_root/root.config';

bootstrapApplication(RootComponent, ROOT_CONFIG)
  .catch((err) => console.error(err));
