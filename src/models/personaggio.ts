import { Arma } from "./arma";
import { Personaggi } from "./enums/personaggi";

export interface Personaggio {
  nomeClasse?: Personaggi;
  vita?: number;
  armi?: Arma[];
}
