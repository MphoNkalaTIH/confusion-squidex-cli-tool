import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfusionModule } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterModule, ConfusionModule],
})
export class ConfusionApp implements OnInit {
  ngOnInit(): void {
    console.log({ launched_app: true });
  }
}
