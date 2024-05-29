import { Arma } from "./arma";
import { Personaggio } from "./personaggio";

export interface SceltaPersonaggio {
  username?: string;
  personaggio?: Personaggio;
  arma?: Arma;
  vitaResidua?: number;
}
