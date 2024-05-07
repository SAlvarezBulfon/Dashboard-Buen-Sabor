import DataModel from "./DataModel";
import Provincia from "./Provincia";

export default interface Localidad extends DataModel<Localidad>{
    nombre: string;
    provincia: Provincia;
  }