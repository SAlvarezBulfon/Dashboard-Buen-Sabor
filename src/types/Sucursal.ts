import Categoria from "./Categoria";
import DataModel from "./DataModel";
import Domicilio from "./Domicilio";
import Promocion from "./Promocion";

export default interface Sucursal  extends DataModel<Sucursal>{
    nombre: string;
    horarioApertura: string;
    horarioCierre: string;
    domicilio: Domicilio[];
    categorias: Categoria[];
    promociones: Promocion[];
  }
  