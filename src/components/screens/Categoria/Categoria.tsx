import { useEffect, useState } from "react";
import { Box, Typography, Button, Container, IconButton, Tooltip, List, ListItem, ListItemText } from "@mui/material";
import { Add, AddCircle, Visibility } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import CategoriaService from "../../../services/CategoriaService";
import Row from "../../../types/Row";
import ICategoria from "../../../types/Categoria";
import { setCategoria } from "../../../redux/slices/CategoriaReducer";
import { handleSearch, onDelete } from "../../../utils/utils";
import { toggleModal } from "../../../redux/slices/ModalReducer";
import Column from "../../../types/Column";
import SearchBar from "../../ui/common/SearchBar/SearchBar";
import TableComponent from "../../ui/Table/Table";



const Categoria = () => {
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();
  const categoriaService = new CategoriaService();
  // Estado global de Redux
  const globalCategorias = useAppSelector(
    (state) => state.categoria.data
  );

  const [filteredData, setFilteredData] = useState<Row[]>([]);
  const [showSubcategoriaModal, setShowSubcategoriaModal] = useState<boolean>(
    false
  ); // Estado para controlar la visibilidad del modal de subcategoría
  const [categoriaPadre, setCategoriaPadre] = useState<ICategoria | null>(null);

  // Función para obtener las categorias
  const fetchCategorias = async () => {
    try {
      const categorias = await categoriaService.getAll(url + "/categorias");
      dispatch(setCategoria(categorias));
      setFilteredData(categorias);
    } catch (error) {
      console.error("Error al obtener las categorias:", error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, [dispatch, categoriaPadre]);

  // Llama a la función handleSearch cuando se realiza una búsqueda
  const onSearch = (query: string) => {
    handleSearch(query, globalCategorias, "denominacion", setFilteredData);
  };


  const onDeleteCategoria = async (categoria: ICategoria) => {
    try {
      await onDelete(
        categoria,
        async (categoriaToDelete: ICategoria) => {
          // Aquí se llama al servicio para eliminar la categoría
          await categoriaService.delete(url + '/categorias', categoriaToDelete.id.toString());
        },
        fetchCategorias, // Se llama a fetchCategorias para actualizar la lista después de la eliminación
        () => {
        },
        (error: any) => {
          console.error("Error al eliminar categoría:", error);
        }
      );
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
    }
  };
  
  // Función para editar una categoría
  const handleEdit = (index: number) => {
    // Aquí implementa la lógica para editar la categoría en el índice especificado
    console.log("Editar categoría en el índice", index);
  };

  // Función para mostrar el modal de añadir categoría
  const handleAddCategoria = () => {
    dispatch(toggleModal({ modalName: "modal" }));
  };



  const handleOpenSubcategoriaModal = (categoria: ICategoria) => {
    setCategoriaPadre(categoria);
    setShowSubcategoriaModal(true);
  };

//   const handleCloseSubcategoriaModal = () => {
//     setShowSubcategoriaModal(false);
//     setCategoriaPadre(null); // Limpiamos la categoría padre
//   };



  // Definición de las columnas para la tabla de categorías
  const columns: Column[] = [
    { id: "denominacion", label: "Nombre", renderCell: (rowData) => <>{rowData.denominacion}</> },
    {
      id: "subCategorias",
      label: "Subcategorías",
      renderCell: (rowData) => (
        <>
          {rowData.subCategorias.length > 0 ? (
            <List>
              {rowData.subCategorias.map((subcategoria: ICategoria, index: number) => (
                <ListItem key={index}>
                  <ListItemText primary={subcategoria.denominacion} />
                </ListItem>
              ))}
            </List>
          ) : (
            "-"
          )}
        </>
      ),
    },
    {
      id: "agregarSubcategoria",
      label: "Agregar Subcategoría",
      renderCell: (rowData) => (
        <Button
          onClick={() => handleOpenSubcategoriaModal(rowData)} // Abre el modal de subcategoría pasando la categoría padre
          variant="outlined"
          color="primary"
          startIcon={<Add />}
        >
          Agregar
        </Button>
      ),
    },
    {
      id: "articulos",
      label: "Artículos",
      renderCell: () => (
        <Box>
          <Tooltip title="Ver Artículos">
            <IconButton
              aria-label="Ver Artículos"
            >
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Agregar artículo">
            <IconButton
              aria-label="Agregar artículo"
            >
               <AddCircle />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 10 }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 1,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Categorías
          </Typography>
          <Button
            onClick={handleAddCategoria} // Maneja el evento de clic para mostrar el modal de categoría
            sx={{
              bgcolor: "#fb6376",
              "&:hover": {
                bgcolor: "#d73754",
              },
            }}
            variant="contained"
            startIcon={<Add />}
          >
            Categoría
          </Button>
        </Box>
        {/* Barra de búsqueda */}
        <Box sx={{ mt: 2 }}>
          <SearchBar onSearch={onSearch} />
        </Box>
        {/* Componente de tabla para mostrar las categorías */}
        <TableComponent
          data={filteredData}
          columns={columns}
          onEdit={handleEdit}
          onDelete={onDeleteCategoria}
        />
      </Container>
    </Box>
  );
};

export default Categoria;
