// Importamos el tipo de dato IPromocion y la clase BackendClient
import IPromocion from "../types/Promocion";
import  BackendClient  from "./BackendClient";

// Clase PromocionService que extiende BackendClient para interactuar con la API de personas
export default class PromocionService extends BackendClient<IPromocion> {}