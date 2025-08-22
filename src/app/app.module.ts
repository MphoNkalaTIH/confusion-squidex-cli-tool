import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfusionBreadCrumbComponent } from './components/confusion-bread-crumb/confusion-bread-crumb-component';
import { ConfusionButtonComponent } from './components/confusion-button/confusion-button.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [HomePageComponent, ConfusionButtonComponent, ConfusionBreadCrumbComponent],
  imports: [CommonModule, FontAwesomeModule, RouterOutlet],
})
export class ConfusionModule {}
