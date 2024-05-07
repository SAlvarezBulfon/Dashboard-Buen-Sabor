import ArticuloInsumo from "./ArticuloInsumo";
import DataModel from "./DataModel";

interface IArticuloManufacturadoDetalle extends  DataModel<IArticuloManufacturadoDetalle> {
    cantidad: number;
    articuloInsumo: ArticuloInsumo;
}

export default IArticuloManufacturadoDetalle;