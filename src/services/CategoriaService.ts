// Importamos el tipo de dato ICategoria y la clase BackendClient
import ICategoria from "../types/Categoria";
import  BackendClient  from "./BackendClient";

// Clase CategoriaService que extiende BackendClient para interactuar con la API de personas
export default class CategoriaService extends BackendClient<ICategoria> {}