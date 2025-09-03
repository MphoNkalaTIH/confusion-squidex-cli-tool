import { Component, EventEmitter, input, Output } from '@angular/core';
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

  @Output() breadCrumbEvent = new EventEmitter<BreadCumb>();

  faHome = faHome;
  faArrowRight = faArrowRight;
}
