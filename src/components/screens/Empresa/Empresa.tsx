import { useEffect, useState } from "react";
import { Box, Typography, Button, Container, Tooltip, IconButton } from "@mui/material";
import { Add, Visibility, AddCircle } from "@mui/icons-material"; // Importamos los iconos adecuados
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setEmpresa } from "../../../redux/slices/EmpresaReducer";

import EmpresaService from "../../../services/EmpresaService";
import Column from "../../../types/Column";
import Empresa from "../../../types/Empresa";
import { Link } from "react-router-dom";
import { toggleModal } from "../../../redux/slices/ModalReducer";
import { handleSearch } from "../../../utils/utils";
import SearchBar from "../../ui/common/SearchBar/SearchBar";
import TableComponent from "../../ui/Table/Table";
import { ModalEmpresa } from "../../ui/Modals/ModalEmpresa";

const EmpresaComponent = () => {
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();
  const empresaService = new EmpresaService();
  const globalEmpresas = useAppSelector(
    (state) => state.empresa.data
  );

  const [filteredData, setFilteredData] = useState<Empresa[]>([]);

  const fetchEmpresas = async () => {
    try {
      const empresas = await empresaService.getAll(url + '/empresas');
      dispatch(setEmpresa(empresas)); 
      setFilteredData(empresas); 
    } catch (error) {
      console.error("Error al obtener las empresas:", error);
    }
  }; 

  useEffect(() => {
    fetchEmpresas(); 
  }, [dispatch]); 

  const onSearch = (query: string) => {
    handleSearch(query, globalEmpresas, 'nombre', setFilteredData);
  };
  
  const onDelete = async (empresa: Empresa) => {
    try {
      console.log("Eliminando empresa con ID", empresa.id);
      // Lógica para eliminar la empresa con el ID proporcionado
    } catch (error) {
      console.error("Error al eliminar empresa:", error);
    }
  };
  
  const handleEdit = (id: number) => {
    console.log("Editar empresa con ID", id);
    // Lógica para editar la empresa con el ID proporcionado
  };
  
  const handleAddEmpresa = () => {
    dispatch(toggleModal({ modalName: "modal" }));
  };

  const columns: Column[] = [
    { id: "nombre", label: "Nombre", renderCell: (empresa) => <>{empresa.nombre}</> },
    { id: "razonSocial", label: "Razón Social", renderCell: (empresa) => <>{empresa.razonSocial}</> },
    { id: "cuil", label: "CUIL", renderCell: (empresa) => <>{empresa.cuil}</> },
    {
      id: "sucursales",
      label: "Sucursales",
      renderCell: (empresa) => (
        <>
        <Tooltip title="Ver Sucursales">
          {/* Verificar si la empresa tiene sucursales */}
          {empresa.sucursales.length > 0 ? (
            <IconButton component={Link} to={`/empresas/${empresa.id}`} aria-label="Ver Sucursales">
              <Visibility />
            </IconButton>
          ) : (
            <IconButton disabled aria-label="Ver Sucursales">
              <Visibility />
            </IconButton>
          )}
        </Tooltip>
          <Tooltip title="Agregar Sucursal">
            <IconButton component={Link} to={`/agregar-sucursal/${empresa.id}`} aria-label="Agregar Sucursal">
              <AddCircle />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 10}}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Empresas
          </Typography>
          <Button
            onClick={handleAddEmpresa}
            sx={{
              bgcolor: "#fb6376",
              "&:hover": {
                bgcolor: "#d73754",
              },
            }}
            variant="contained"
            startIcon={<Add />}
          >
            Empresa
          </Button>
        </Box>
        <Box sx={{mt:2 }}>
          <SearchBar onSearch={onSearch} />
        </Box>
        <TableComponent data={filteredData} columns={columns} onDelete={onDelete} onEdit={handleEdit} />
        <ModalEmpresa getEmpresas={fetchEmpresas} />
      </Container>
    </Box>
  );
};

export default EmpresaComponent;
