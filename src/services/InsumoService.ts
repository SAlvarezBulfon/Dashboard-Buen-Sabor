// Importamos el tipo de dato IInsumo y la clase BackendClient
import IInsumo from "../types/ArticuloInsumo";
import  BackendClient  from "./BackendClient";

// Clase InsumoService que extiende BackendClient para interactuar con la API de personas
export default class InsumoService extends BackendClient<IInsumo> {}