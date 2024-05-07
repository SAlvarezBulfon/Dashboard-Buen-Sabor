// Importamos el tipo de dato IArticuloManufacturado y la clase BackendClient
import IArticuloManufacturado from "../types/ArticuloManufacturado";
import  BackendClient  from "./BackendClient";

// Clase ProductoService que extiende BackendClient para interactuar con la API de personas
export default class ProductoService extends BackendClient<IArticuloManufacturado> {}