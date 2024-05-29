import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss', './../../app.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {
    var firstCharacter = JSON.parse(
      localStorage.getItem('firstPlayerCharacter')!
    );
    var secondCharacter = JSON.parse(
      localStorage.getItem('secondPlayerCharacter')!
    );

    if (firstCharacter && secondCharacter) this.route.navigate(['/game']);
  }

  navigateToSceltaPersonaggi = () =>
    this.route.navigate(['/scelta-personaggi']);
}
