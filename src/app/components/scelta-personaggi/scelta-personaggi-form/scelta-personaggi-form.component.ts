import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonaggiService } from 'src/app/service/personaggi-service.service';
import { Personaggio } from 'src/models/personaggio';
import { SceltaPersonaggio } from 'src/models/scelta-personaggio';

@Component({
  selector: 'app-scelta-personaggi-form',
  templateUrl: './scelta-personaggi-form.component.html',
  styleUrls: ['./scelta-personaggi-form.component.scss'],
})
export class SceltaPersonaggiFormComponent implements OnInit {
  @Output() username = new EventEmitter<string>();
  @Output() personaggio = new EventEmitter<SceltaPersonaggio>();
  @Output() isCharachterChoosen = new EventEmitter<boolean>();
  @Input() isPlayerOnesTurn: boolean = true;

  choosenUsername: string = '';
  choosenCharacter: Personaggio = {};
  selectedWeaponIndex: number = -1;

  isFormCompleted: boolean = false;
  isPlayerOneTurn: boolean = true;
  isArmiSelectActive: boolean = false;

  firstPlUsername: string = 'Scegli un username';
  secondPlUsername: string = 'Scegli un username';

  ////HARCODED-delete when backend is present
  personaggiList: Personaggio[] = [];
  constructor(private router: Router, private personaggiService: PersonaggiService) {}

  ngOnInit(): void {
    this.personaggiList = this.personaggiService.getPersonaggi();
   }

  sceltaPersonaggioForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    personaggio: new FormControl('', [Validators.required]),
  });

  getPersonaggi(opt: string) {
    this.choosenCharacter = this.personaggiList.find(
      (character) => character.nomeClasse === opt
    )!;

    this.isArmiSelectActive = true;

    this.isCharachterChoosen.emit(true);
  }

  getImagePath(nomeArma: string): string {
    if (nomeArma.toLowerCase() == 'bacchetta magica') {
      return `./../../../../assets/img/bacchetta.png`;
    } else {
      return `./../../../../assets/img/${nomeArma
        .toLowerCase()
        .replace(/\s/g, '')}.png`;
    }
  }

  selectWeapon(index: number) {
    this.selectedWeaponIndex = index;

    this.isFormCompleted = true;
  }

  getStyleForImages(arma: string, isWidth: boolean) {
    if (isWidth) {
      switch (arma) {
        case 'Scudo e spada':
          return 180;
        case 'Mazza a due mani':
          return 180;
        case 'Balestra':
          return 200;
        case 'Arco':
          return 200;
        case 'Bacchetta magica':
          return 160;
        case 'Pergamena':
          return 210;
        default:
          return 140;
      }
    } else {
      switch (arma) {
        case 'Scudo e spada':
          return 200;
        case 'Mazza a due mani':
          return 180;
        case 'Balestra':
          return 220;
        case 'Arco':
          return 220;
        case 'Bacchetta magica':
          return 160;
        case 'Pergamena':
          return 160;
        default:
          return 140;
      }
    }
  }

  getValue(e: any) {
    this.choosenUsername = e.target?.value;
  }


  sendDatas = () => {
    if (this.choosenUsername != '') {
      this.username.emit(this.choosenUsername);
    }

    if (Object.keys(this.choosenCharacter).length > 0) {
      // Copia il personaggio selezionato
      var personaggioConArmaSelezionata: SceltaPersonaggio = {
        username: this.choosenUsername,
        personaggio: { ...this.choosenCharacter },
        arma: this.selectedWeaponIndex !== -1 ? this.choosenCharacter.armi![this.selectedWeaponIndex] : undefined,
        vitaResidua: this.choosenCharacter.vita
      };

      console.log(this.choosenCharacter);

      // Invia il personaggio con l'arma selezionata al padre
      this.personaggio.emit(personaggioConArmaSelezionata);
    }

    this.isPlayerOneTurn = !this.isPlayerOneTurn;

    var firstCharacter = JSON.parse(localStorage.getItem("firstPlayerCharacter")!);
    var secondCharacter = JSON.parse(localStorage.getItem("secondPlayerCharacter")!);

    this.firstPlUsername = firstCharacter;
    this.secondPlUsername = secondCharacter;

    if(firstCharacter && secondCharacter) {
     this.router.navigate(['/game']);
    }

    this.isCharachterChoosen.emit(false);
  };
}
