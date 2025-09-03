import { Component, OnInit, signal } from '@angular/core';
import { faArrowRight, faHome } from '@fortawesome/free-solid-svg-icons';
import { BreadCumb } from '../../models/breadcrumb.model';

@Component({
  selector: 'confusion-bread-crumb',
  templateUrl: './confusion-bread-crumb-component.html',
  styleUrl: './confusion-bread-crumb-component.scss',
  standalone: false,
})
export class ConfusionBreadCrumbComponent implements OnInit {
  items = signal<BreadCumb[] | undefined>([]);

  faHome = faHome;
  faArrowRight = faArrowRight;

  ngOnInit(): void {
    this.items.set([
      { label: 'Electronics', navigation: 'folder/Electronics' },
      { label: 'Computer', navigation: 'folder/Computer' },
      { label: 'Accessories', navigation: 'folder/Accessories' },
      { label: 'Keyboard', navigation: 'folder/Keyboard' },
      { label: 'Wireless', navigation: 'folder/Wireless' },
    ]);
  }

  navigateToBreadCrumbPath(navigateToBreadCrumbPath: string) {
    console.log({ navigating_to: navigateToBreadCrumbPath });
  }
}
