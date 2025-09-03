import { bootstrapApplication } from '@angular/platform-browser';
import { ConfusionApp } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(ConfusionApp, appConfig).catch((err) => console.error(err));
