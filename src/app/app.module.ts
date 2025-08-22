import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfusionApp } from './app';
import { ConfusionBreadCrumbComponent } from './components/confusion-bread-crumb/confusion-bread-crumb-component';
import { ConfusionButtonComponent } from './components/confusion-button/confusion-button.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [ConfusionButtonComponent, ConfusionBreadCrumbComponent],
  imports: [CommonModule, FontAwesomeModule, HomePageComponent, RouterModule, ConfusionApp],
  exports: [ConfusionButtonComponent, FontAwesomeModule, ConfusionBreadCrumbComponent],
  bootstrap: [],
})
export class ConfusionModule {}
