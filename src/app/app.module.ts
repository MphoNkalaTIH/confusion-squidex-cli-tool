import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfusionBreadCrumbComponent } from './components/confusion-bread-crumb/confusion-bread-crumb-component';
import { ConfusionButtonComponent } from './components/confusion-button/confusion-button.component';
import { ConfusionActionModalComponent } from './components/confusion-modals/confusion-action-modal/confusion-action-modal.component';
import { ConfusionFunctionModalComponent } from './components/confusion-modals/confusion-functional-modal/confusion-functional-modal.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    ConfusionButtonComponent,
    ConfusionBreadCrumbComponent,
    ConfusionFunctionModalComponent,
    ConfusionActionModalComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, RouterOutlet],
})
export class ConfusionModule {}
