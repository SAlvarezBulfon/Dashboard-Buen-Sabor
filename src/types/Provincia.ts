import DataModel from "./DataModel";
import Pais from "./Pais";

export default interface Provincia extends DataModel<Provincia> {
    nombre: string;
    pais: Pais;
  }