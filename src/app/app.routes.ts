import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    data: {
      breadcrumb: 'home',
      isNav: false,
      caption: '',
      icon: '',
      isLabel: false,
    },
  },
];
