import { Component, Input, OnInit } from '@angular/core';
import { Personaggi } from 'src/models/enums/personaggi';
import { SceltaPersonaggio } from 'src/models/scelta-personaggio';
import { PersonaggiService } from 'src/app/service/personaggi-service.service';
import { Personaggio } from 'src/models/personaggio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fighting',
  templateUrl: './fighting.component.html',
  styleUrls: ['./fighting.component.scss'],
})
export class FightingComponent implements OnInit {
  @Input() firstPlayer: SceltaPersonaggio = {};
  @Input() secondPlayer: SceltaPersonaggio = {};
  @Input() isPlayer1Starting: boolean = false;

  winner: SceltaPersonaggio | null = null;
  fightingPlayer: SceltaPersonaggio = {};
  colpoMancato: boolean = false;
  attackMessage: string = '';
  currentTurn: number = 1; // 1 per il primo giocatore, 2 per il secondo giocatore
  isAnimating: boolean = false;

  personaggiList: Personaggio[] = [];

  constructor(private personaggiService: PersonaggiService, private router: Router) { }

  ngOnInit(): void {
    this.startFight(this.firstPlayer, this.secondPlayer);
    this.personaggiList = this.personaggiService.getPersonaggi();
  }

  getImgSrc(player: SceltaPersonaggio): string {
    const classe = player.personaggio?.nomeClasse;
    const fileExtension = classe === Personaggi.MAGO ? 'webp' : 'png';
    return `./../../../../assets/img/${classe?.toLowerCase()}.${fileExtension}`;
  }

  async startFight(startingPlayer: SceltaPersonaggio, secondPlayer: SceltaPersonaggio) {
    await this.fight(startingPlayer, secondPlayer);
  }

  async fight(startingPlayer: SceltaPersonaggio, secondPlayer: SceltaPersonaggio) {
    while (!this.winner) {
      if (this.currentTurn === 1) {
        this.winner = await this.round(startingPlayer, secondPlayer);
      } else {
        this.winner = await this.round(secondPlayer, startingPlayer);
      }

      // Introduce a delay between rounds
      await this.delay(2000); // Ritardo di 2 secondi tra i turni
    }
  }

  async round(firstPlayer: SceltaPersonaggio, secondPlayer: SceltaPersonaggio): Promise<SceltaPersonaggio | null> {
    const vitaRimanenteSecondPlayer: number =
      secondPlayer.vitaResidua! - (await this.picchia(firstPlayer));
    const vitaRimanenteFirstPlayer: number =
      firstPlayer.vitaResidua! - (await this.picchia(secondPlayer));

    secondPlayer.vitaResidua = vitaRimanenteSecondPlayer;
    firstPlayer.vitaResidua = vitaRimanenteFirstPlayer;

    if (vitaRimanenteSecondPlayer <= 0) {
      return firstPlayer;
    }

    if (vitaRimanenteFirstPlayer <= 0) {
      return secondPlayer;
    }

    // Mostra il messaggio del primo giocatore
    this.attackMessage =
      `${secondPlayer.username} ti rimane ${vitaRimanenteSecondPlayer} vita`;
    this.isAnimating = true; // Attiva l'animazione
    await this.delay(2000); // Mostra il messaggio per 2 secondi
    this.isAnimating = false; // Disattiva l'animazione

    // Mostra il messaggio del secondo giocatore
    this.attackMessage =
      `${firstPlayer.username} ti rimane ${vitaRimanenteFirstPlayer} vita`;
    this.isAnimating = true; // Attiva l'animazione
    await this.delay(2000); // Mostra il messaggio per 2 secondi
    this.isAnimating = false; // Disattiva l'animazione

    this.attackMessage = ''; // Pulisci il messaggio dopo aver mostrato entrambi

    return null;
  }

  async picchia(fightingPlayer: SceltaPersonaggio): Promise<number> {
    let danni: number = 0;

    if (Math.random() < fightingPlayer.arma?.probabilita!) {
      if (Math.random() < 0.3) {
        danni = fightingPlayer.arma?.danni! * 2;
        this.attackMessage = `${fightingPlayer.username} ha sferrato un colpo critico e ha fatto ${danni} danni`;
      } else {
        danni = fightingPlayer.arma?.danni!;
        this.attackMessage = `${fightingPlayer.username} hai fatto ${danni} danni`;
      }
    } else {
      this.colpoMancato = true;
      this.fightingPlayer = fightingPlayer;
      this.attackMessage = `${fightingPlayer.username} hai mancato il colpo!`;
    }

      // Aggiorna il turno corrente dopo ogni attacco
      this.currentTurn = this.currentTurn === 1 ? 2 : 1;

    // Wait for the message to be displayed for a while
    await this.delay(2000);

    this.attackMessage = '';
    this.colpoMancato = false;

    return danni;
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  playAgain(firstPlayer: SceltaPersonaggio, secondPlayer: SceltaPersonaggio) {
    this.winner = null;

    const firstPlayerCharacter = this.personaggiList.find((el) => el.nomeClasse === firstPlayer.personaggio?.nomeClasse);
    const secondPlayerCharacter = this.personaggiList.find((el) => el.nomeClasse === secondPlayer.personaggio?.nomeClasse);

    firstPlayer.vitaResidua = firstPlayerCharacter?.vita;
    secondPlayer.vitaResidua = secondPlayerCharacter?.vita;

    this.startFight(this.firstPlayer, this.secondPlayer);

    console.log('First player: ', firstPlayerCharacter, '. Secon player: ', secondPlayerCharacter)
  }

  endGame() {
    localStorage.clear();

    this.router.navigate(['/scelta-personaggi']);
  }
}
