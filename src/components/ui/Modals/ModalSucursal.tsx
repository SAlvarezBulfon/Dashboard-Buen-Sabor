import React from 'react';
import * as Yup from 'yup';
import GenericModal from '../../ui/Modals/GenericModal'; 
import TextFieldValue from '../../ui/TextFieldValue/TextFieldValue'; 
import SucursalService from '../../../services/SucursalService'; 
import Sucursal from '../../../types/Sucursal'; 

interface ModalSucursalProps {
  modalName: string;
  initialValues: Sucursal;
  isEditMode: boolean;
  getSucursales: Function;
  sucursalAEditar?: Sucursal;
}

const ModalSucursal: React.FC<ModalSucursalProps> = ({
  modalName,
  initialValues,
  isEditMode,
  getSucursales,
  sucursalAEditar,
}) => {
  const sucursalService = new SucursalService();
  const URL = import.meta.env.VITE_API_URL;

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('Campo requerido'),
    horarioCierre: Yup.string().required('Campo requerido'),
    horarioApertura: Yup.string().required('Campo requerido'),
    domicilio: Yup.object().shape({
      calle: Yup.string().required('Campo requerido'),
      numero: Yup.number().required('Campo requerido'),
      cp: Yup.number().required('Campo requerido'),
      piso: Yup.number(),
      nroDpto: Yup.number(),
      localidad: Yup.object().shape({
        id: Yup.number().required('Campo requerido'),
        nombre: Yup.string().required('Campo requerido'),
        provincia: Yup.object().shape({
          id: Yup.number().required('Campo requerido'),
          nombre: Yup.string().required('Campo requerido'),
          pais: Yup.object().shape({
            id: Yup.number().required('Campo requerido'),
            nombre: Yup.string().required('Campo requerido'),
          }),
        }),
      }),
    }),
  });

  const handleSubmit = async (values: Sucursal) => {
    try {
      if (isEditMode) {
        await sucursalService.put(`${URL}/sucursales`, values.id.toString(), values);
      } else {
        await sucursalService.post(`${URL}/sucursales`, values);
      }
      getSucursales(); //Actualiza la lista de sucursales
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

 
  if (!isEditMode) {
    initialValues = {
      id: 0,
      nombre: '',
      horarioApertura: '',
      horarioCierre: '',
      domicilio:[{ 
        id: 0,
        calle: '',
        numero: 0,
        cp: 0,
        piso: 0,
        nroDpto: 0,
        localidad: {
          id: 0,
          nombre: '',
          provincia: {
            id: 0,
            nombre: '',
            pais: {
              id: 0,
              nombre: ''
            }
          }
        }
      }],
      categorias:[],
      promociones:[]
    };

  }

  return (
    <GenericModal
      modalName={modalName}
      title={isEditMode ? 'Editar Sucursal' : 'Añadir Sucursal'}
      initialValues={sucursalAEditar || initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      isEditMode={isEditMode}
    >
      <TextFieldValue label="Nombre" name="nombre" type="text" placeholder="Nombre" />
      <TextFieldValue label="horarioApertura" name="horarioApertura" type="time" placeholder="Horario de apertura" />
      <TextFieldValue label="horarioCierre" name="horarioCierre" type="time" placeholder="Horario de cierre" />
      <TextFieldValue label="Calle" name="domicilio.calle" type="text" placeholder="Calle" />
      <TextFieldValue label="Número" name="domicilio.numero" type="number" placeholder="Número" />
      <TextFieldValue label="Código Postal" name="domicilio.cp" type="number" placeholder="Código Postal" />
      <TextFieldValue label="Piso" name="domicilio.piso" type="number" placeholder="Piso" />
      <TextFieldValue label="Número de Departamento" name="domicilio.nroDpto" type="number" placeholder="Número de Departamento" />
      <TextFieldValue label="Localidad" name="domicilio.localidad.nombre" type="text" placeholder="Localidad" />
      <TextFieldValue label="Provincia" name="domicilio.localidad.provincia.nombre" type="text" placeholder="Provincia" />
      <TextFieldValue label="País" name="domicilio.localidad.provincia.pais.nombre" type="text" placeholder="País" />
    </GenericModal>
  );
};

export default ModalSucursal;

