import DataModel from "./DataModel";
import Localidad from "./Localidad";

export default interface Domicilio  extends DataModel<Domicilio>{
    calle: string;
    numero: number;
    cp: number;
    piso?: number | null;
    nroDpto?: number | null;
    localidad: Localidad;
  }