import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SceltaPersonaggio } from 'src/models/scelta-personaggio';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
})
export class StarterComponent implements OnInit {

  firstPlayer: SceltaPersonaggio = {};
  secondPlayer: SceltaPersonaggio = {};

  fightIsStarted: boolean = false;
  isPlayer1Starting: boolean = true;
  showLoader: boolean = true;


  constructor(private router: Router) {}

  ngOnInit(): void {

    setTimeout(() => {
      this.showLoader = false;
    }, 3000);


    var firstCharacter = JSON.parse(
      localStorage.getItem('firstPlayerCharacter')!
    );
    var secondCharacter = JSON.parse(
      localStorage.getItem('secondPlayerCharacter')!
    );

    this.firstPlayer = firstCharacter;
    this.secondPlayer = secondCharacter;

    console.log(this.firstPlayer, this.secondPlayer)

    this.isPlayer1Starting = Math.random() >= 0.5;

    if(!this.firstPlayer || !this.secondPlayer) {
      this.router.navigate(['/scelta-personaggi'])
    }
  }

  fight() {
    this.fightIsStarted = true;
  }
}
