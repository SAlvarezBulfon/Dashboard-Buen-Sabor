import { Dispatch, SetStateAction } from "react";

/**
 * Función para realizar una búsqueda dentro de un conjunto de datos.
 * @param query La cadena de búsqueda.
 * @param data Array de datos en el que se realizará la búsqueda.
 * @param nombre El nombre de la propiedad sobre la que se realizará la búsqueda.
 * @param setData Función para actualizar los datos filtrados con los resultados de la búsqueda.
 */
export const handleSearch = (
    query: string,
    data: any[],
    nombre: string, // Cambiado a string en lugar de any
    setData: Dispatch<SetStateAction<any[]>>
  ) => {
    const filtered = data.filter((item) =>
      item[nombre].toLowerCase().includes(query.toLowerCase())
    );
    setData(filtered);
  };
  