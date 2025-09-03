import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ConfusionModule } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterModule, ConfusionModule],
})
export class ConfusionApp implements OnInit {
  constructor(readonly router: Router) {}

  ngOnInit(): void {
    this.router.navigateByUrl('/home'); //rerouting here
  }
}
