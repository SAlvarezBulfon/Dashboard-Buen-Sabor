import { useState, useEffect } from "react";
import { Box, Typography, Button, Container } from "@mui/material";

import InsumoService from "../../../services/InsumoService";
import IArticuloInsumo from "../../../types/ArticuloInsumo";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Row from "../../../types/Row";
import { setInsumo } from "../../../redux/slices/InsumoReducer";
import { handleSearch, onDelete } from "../../../utils/utils";
import Column from "../../../types/Column";
import { Add } from "@mui/icons-material";
import SearchBar from "../../ui/common/SearchBar/SearchBar";
import TableComponent from "../../ui/Table/Table";
import ModalInsumo from "../../ui/Modals/ModalInsumo";
import { toggleModal } from "../../../redux/slices/ModalReducer";


const Insumo = () => {
  const dispatch = useAppDispatch();
  const globalArticulosInsumos = useAppSelector((state) => state.insumo.data);
  const url = import.meta.env.VITE_API_URL;
  const insumoService = new InsumoService();
  const [filteredData, setFilteredData] = useState<Row[]>([]);
  const [insumoEditar, setInsumoEditar] = useState<IArticuloInsumo>();
  const [isEditing, setIsEditing] = useState(false);

  const fetchArticulosInsumos = async () => {
    try {
      const articulosInsumos = await insumoService.getAll(url + '/articulosInsumos');
      dispatch(setInsumo(articulosInsumos));
      setFilteredData(articulosInsumos);
    } catch (error) {
      console.error("Error al obtener los artículos de insumo:", error);
    }
  };

  useEffect(() => {
    fetchArticulosInsumos();
  }, [dispatch]);

  const onSearch = (query: string) => {
    handleSearch(query, globalArticulosInsumos, 'denominacion', setFilteredData);
  };

  const onDeleteInsumo = async (insumo: Row) => {
    try {
      await onDelete(
        insumo,
        async (insumoToDelete: Row) => {
          await insumoService.delete(url + '/articulosInsumos', insumoToDelete.id.toString());
        },
        fetchArticulosInsumos,
        () => {
        },
        (error: any) => {
          console.error("Error al eliminar insumo:", error);
        }
      );
    } catch (error) {
      console.error("Error al eliminar insumo:", error);
    }
  };

  const handleEdit = (insumo: IArticuloInsumo) => {
    setIsEditing(true);
    setInsumoEditar(insumo)
    dispatch(toggleModal({ modalName: "modal" }));
  };

  const handleOpenModal = () => {
    setInsumoEditar(undefined); // Limpiar cualquier valor previo de insumoEditar
    setIsEditing(false); // Establecer el modo de edición en false para agregar un nuevo artículo
    dispatch(toggleModal({ modalName: "modal" }));
  };



  const columns: Column[] = [
    {
      id: "imagen",
      label: "Imagen",
      renderCell: (rowData) => (
        <img
          src={rowData.imagenes.length > 0 ? rowData.imagenes[0].url : ""}
          alt="Imagen"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    { id: "denominacion", label: "Nombre", renderCell: (rowData) => <>{rowData.denominacion}</> },
    { id: "precioCompra", label: "Precio de compra", renderCell: (rowData) => <>{rowData.precioCompra}</> },
    { id: "precioVenta", label: "Precio de Venta", renderCell: (rowData) => <>{rowData.precioVenta}</> },
    { id: "stock", label: "Stock", renderCell: (rowData) => <>{rowData.stockActual}</> },
    {
      id: "elaboracion",
      label: "¿Es para elaborar?",
      renderCell: (rowData) => <>{rowData.esParaElaborar ? "Sí" : "No"}</>,
    },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 10 }}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Insumos
          </Typography>
          <Button
            sx={{
              bgcolor: "#fb6376",
              "&:hover": {
                bgcolor: "#d73754",
              },
            }}
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenModal}
          >
            Insumo
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <SearchBar onSearch={onSearch} />
        </Box>
        <TableComponent data={filteredData} columns={columns} onDelete={onDeleteInsumo} onEdit={handleEdit} />
        <ModalInsumo
          modalName="modal"
          initialValues={{
            id: insumoEditar ? insumoEditar.id : 0,
            denominacion: insumoEditar ? insumoEditar.denominacion : "",
            precioVenta: insumoEditar ? insumoEditar.precioVenta : 0,
            imagenes: insumoEditar ? [{ id: 0, url: insumoEditar.imagenes.length > 0 ? insumoEditar.imagenes[0].url : '' }] : [{ id: 0, url: '' }],
            unidadMedida: insumoEditar ? insumoEditar.unidadMedida : { id: 0, denominacion: "" },
            precioCompra: insumoEditar ? insumoEditar.precioCompra : 0,
            stockActual: insumoEditar ? insumoEditar.stockActual : 0,
            stockMaximo: insumoEditar ? insumoEditar.stockMaximo : 0,
            stockMinimo: insumoEditar ? insumoEditar.stockMinimo : 0,
            esParaElaborar: insumoEditar ? insumoEditar.esParaElaborar : false,
          }}
          isEditMode={isEditing}
          getInsumos={fetchArticulosInsumos}
        />
      </Container>
    </Box>
  );
};

export default Insumo;