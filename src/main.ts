import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ConfusionModule } from './app/app.module';

bootstrapApplication(ConfusionModule, appConfig).catch((err) => console.error(err));
