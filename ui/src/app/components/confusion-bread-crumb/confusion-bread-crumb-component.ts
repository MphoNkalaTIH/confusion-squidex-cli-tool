import { Component, input } from '@angular/core';
import { faArrowRight, faHome } from '@fortawesome/free-solid-svg-icons';
import { BreadCumb } from '../../models/breadcrumb.model';

@Component({
  selector: 'confusion-bread-crumb',
  templateUrl: './confusion-bread-crumb-component.html',
  styleUrl: './confusion-bread-crumb-component.scss',
  standalone: false,
})
export class ConfusionBreadCrumbComponent {
  items = input<BreadCumb[] | undefined>([]);

  faHome = faHome;
  faArrowRight = faArrowRight;

  navigateToBreadCrumbPath(navigateToBreadCrumbPath: string) {
    console.log({ navigating_to: navigateToBreadCrumbPath });
  }
}
