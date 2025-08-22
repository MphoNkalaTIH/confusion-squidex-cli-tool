import { Component, input, OnInit, output } from '@angular/core';
import {
  faBan,
  faBug,
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faExclamationCircle,
  faSave,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'confusion-functional-modal',
  templateUrl: './confusion-functional-modal.component.html',
  styleUrls: ['./confusion-functional-modal.component.scss'],
  standalone: false,
})
export class ConfusionFunctionModalComponent implements OnInit {
  addOrEditModalHeaderText = input<string>('');
  dismissText = input<string>('Cancel');
  submitText = input<string>('Confirm');

  functionalModalEvent = output<string>(); //returns cancel or submit

  ngOnInit(): void {}

  icons = {
    Delete: faTrash,
    Warning: faExclamationCircle,
    Success: faCircleCheck,
    Information: faCircleInfo,
    Error: faBug,
  };

  faCircleXmark = faCircleXmark;
  faBan = faBan;
  faSave = faSave;
}
