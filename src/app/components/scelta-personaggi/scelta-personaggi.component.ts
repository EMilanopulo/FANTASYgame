import { Component, OnInit } from '@angular/core';
import { Personaggio } from 'src/models/personaggio';
import { SceltaPersonaggio } from 'src/models/scelta-personaggio';

@Component({
  selector: 'app-scelta-personaggi',
  templateUrl: './scelta-personaggi.component.html',
  styleUrls: ['./scelta-personaggi.component.scss'],
})
export class SceltaPersonaggiComponent implements OnInit {
  gameDatas: SceltaPersonaggio[] = [];

  utente1Username: string = '';
  utente2Username: string = '';
  utente1Personaggio: Personaggio = {};
  utente2Personaggio: Personaggio = {};

  isPlayerOnesTurn: boolean = true;

  public isHeadingVisible: boolean = true;
  public isCharacterChoosen: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (
      this.utente1Username != '' &&
      Object.keys(this.utente1Personaggio).length > 0
    ) {
      this.isPlayerOnesTurn = false;
    }
  }

  public hideHeading = () => (this.isHeadingVisible = false);

  getCharachterChoosen(e: any) {
    console.log(e);
    this.isCharacterChoosen = e;
  }

  getUsername = (w: any) => {
    if (this.utente1Username == '') {
      this.utente1Username = w;

      this.isPlayerOnesTurn = false;

      this.isHeadingVisible = true;

      console.log('Utente 1' + this.utente1Username);

      localStorage.setItem('firstPlayerUsername', this.utente1Username);
    } else {
      this.utente2Username = w;

      this.isPlayerOnesTurn = true;

      localStorage.setItem('secondPlayerUsername', this.utente2Username);
    }
  };

  getPersonaggio = (w: any) => {
    if (Object.keys(this.utente1Personaggio).length <= 0) {
      this.utente1Personaggio = w;

      this.isPlayerOnesTurn = false;

      this.isHeadingVisible = true;

      console.log('Utente 1' + JSON.stringify(this.utente1Personaggio));
      localStorage.setItem(
        'firstPlayerCharacter',
        JSON.stringify(this.utente1Personaggio)
      );
    } else {
      this.utente2Personaggio = w;

      this.isPlayerOnesTurn = true;

      console.log('Utente 2' + JSON.stringify(this.utente2Personaggio));

      localStorage.setItem(
        'secondPlayerCharacter',
        JSON.stringify(this.utente2Personaggio)
      );
    }
  };
}
