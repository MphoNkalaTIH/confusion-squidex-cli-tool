import { Component, input, output } from '@angular/core';
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
  selector: 'confusion-action-modal',
  templateUrl: './confusion-action-modal.component.html',
  styleUrls: ['./confusion-action-modal.component.scss'],
  standalone: false,
})
export class ConfusionActionModalComponent {
  actionType = input<'Delete' | 'Warning' | 'Error' | 'Information' | 'Success'>('Information');
  actionHeaderText = input<string>('');
  actionBodyText = input<string>('');
  dismissText = input<string>('Cancel');
  submitText = input<string>('Confirm');

  actionModalEvent = output<string>(); //emits cancel or submit

  icons = {
    Delete: faTrash,
    Warning: faExclamationCircle,
    Success: faCircleCheck,
    Information: faCircleInfo,
    Error: faBug,
    faCircleXmark: faCircleXmark,
  };

  faBan = faBan;
  faSave = faSave;

  colors = {
    Delete: '#FF4C4C',
    Warning: '#FFB100',
    Success: '#28C76F',
    Information: '#0096FF',
    Error: '#FF5E57',
  };

  backgroundColors = {
    Delete: '#FFECEC',
    Warning: '#FFF4E0',
    Success: '#E9FBEF',
    Information: '#EAF4FF',
    Error: '#FFEDED',
  };

  get modalTheme() {
    return this.actionType().toLowerCase();
  }
}
