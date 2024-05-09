import DataModel from "./DataModel";
import Imagenes from "./Imagenes";
import UnidadMedida from "./UnidadMedida";

interface IArticuloInsumo extends DataModel<IArticuloInsumo> {
    denominacion: string;
    precioVenta: number;
    imagenes: Imagenes [];
    unidadMedida: UnidadMedida;
    precioCompra: number;
    stockActual: number;
    stockMaximo: number;
    stockMinimo: number;
    esParaElaborar: boolean;
  }

export default IArticuloInsumo;