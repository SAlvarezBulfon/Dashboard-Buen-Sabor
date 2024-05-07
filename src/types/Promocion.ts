import ArticuloInsumo from "./ArticuloInsumo";
import DataModel from "./DataModel";
import Imagenes from "./Imagenes";

interface Promocion extends DataModel<Promocion>{
    denominacion: string;
    fechaDesde: string;
    fechaHasta: string;
    horaDesde: string;
    horaHasta: string;
    descripcionDescuento: string;
    precioPromocional: number;
    tipoPromocion: string;
    articulos: ArticuloInsumo[];
    imagenes: Imagenes[];
  }

  export default Promocion;