import { Component, input, OnInit, output, signal } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ButtonType } from '../../models/button-type.model';

@Component({
  selector: 'confusion-button',
  templateUrl: './confusion-button.component.html',
  styleUrl: './confusion-button.component.scss',
  standalone: false,
})
export class ConfusionButtonComponent implements OnInit {
  //props
  buttonType = input<'success' | 'danger' | 'info' | 'warn' | 'neutral' | 'simple'>('success');
  buttonIcon = input<IconDefinition | undefined>();
  buttonLabel = input<string>('Click Me');
  disabled = input<boolean>(false);

  //outputs
  buttonClick = output<void>();

  //vars
  buttonTypes: ButtonType[] = [
    {
      name: 'success',
      backgroundColor: '#d1e7dd',
      textColor: '#0f5132',
      borderColor: '#badbcc',
    },
    {
      name: 'danger',
      backgroundColor: '#f8d7da',
      textColor: '#842029',
      borderColor: '#f5c2c7',
    },
    {
      name: 'info',
      backgroundColor: '#e2f0fe',
      textColor: '#1a73e8',
      borderColor: '#cce4f7',
    },
    {
      name: 'warn',
      backgroundColor: '#fff3cd',
      textColor: '#664d03',
      borderColor: '#ffecb5',
    },
    {
      name: 'neutral',
      backgroundColor: '#fffde6',
      textColor: '#ff960d',
      borderColor: '#ecc967',
    },
    {
      name: 'simple',
      backgroundColor: '#ffe9fe',
      textColor: '#fd2bda',
      borderColor: '#cc9ac1',
    },
  ];

  //signals
  protected readonly title = signal('confusion-squidex');

  get buttonTypeStyle() {
    return this.buttonTypes.find((type) => type.name === this.buttonType()) || this.buttonTypes[0];
  }

  ngOnInit() {}
}
