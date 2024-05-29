import { Injectable } from '@angular/core';
import { Personaggio } from 'src/models/personaggio';
import { Armi } from 'src/models/enums/armi';
import { Personaggi } from 'src/models/enums/personaggi';

@Injectable({
  providedIn: 'root'
})
export class PersonaggiService {
  private personaggiList: Personaggio[] = [
    {
      nomeClasse: Personaggi.ARCIERE,
      vita: 350,
      armi: [
        {
          nomeArma: Armi.ARCO,
          probabilita: 0.8,
          danni: 70,
        },
        {
          nomeArma: Armi.BALESTRA,
          probabilita: 0.6,
          danni: 120,
        },
      ],
    },
    {
      nomeClasse: Personaggi.GUERRIERO,
      vita: 500,
      armi: [
        {
          nomeArma: Armi.MAZZADUEMANI,
          probabilita: 0.4,
          danni: 200,
        },
        {
          nomeArma: Armi.SCUDOESPADA,
          probabilita: 0.75,
          danni: 90,
        },
      ],
    },
    {
      nomeClasse: Personaggi.MAGO,
      vita: 200,
      armi: [
        {
          nomeArma: Armi.BACCHETTAMAGICA,
          probabilita: 0.9,
          danni: 60,
        },
        {
          nomeArma: Armi.PERGAMENA,
          probabilita: 0.2,
          danni: 500,
        },
      ],
    },
  ];

  constructor() {}

  getPersonaggi(): Personaggio[] {
    return this.personaggiList;
  }
}
