import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import IEmpresa from '../../../types/Empresa';
import { removeElementActive } from '../../../redux/slices/TablaReducer';
import { toggleModal } from '../../../redux/slices/ModalReducer';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import EmpresaService from '../../../services/EmpresaService';
import TextFieldValue from '../TextFieldValue/TextFieldValue';

interface IModalEmpresa {
  getEmpresas: Function;
}

export const ModalEmpresa: React.FC<IModalEmpresa> = ({ getEmpresas }) => {
  const initialValues: IEmpresa = {
    id: 0,
    nombre: '',
    razonSocial: '',
    cuil: 0,
    sucursales: []
  };

  const apiEmpresa = new EmpresaService();
  const modal = useAppSelector((state) => state.modal.modal);
  const elementActive = useAppSelector((state) => state.tabla.elementActive);
  const dispatch = useAppDispatch();
  const URL = import.meta.env.VITE_API_URL;

  const handleClose = () => {
    dispatch(toggleModal({ modalName: 'modal' }));
    dispatch(removeElementActive());
  };

  return (
    <div>
      <Modal id={'modalEmpresa'} show={modal} onHide={handleClose} size={'lg'} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          {elementActive ? <Modal.Title>Editar una empresa:</Modal.Title> : <Modal.Title>Añadir una empresa:</Modal.Title>}
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({
              nombre: Yup.string().required('Campo requerido'),
              razonSocial: Yup.string().required('Campo requerido'),
              cuil: Yup.string()
                .matches(/^[0-9]+$/, 'CUIL inválido. Solo se permiten números.')
                .matches(/^\d{11}$/, 'CUIL inválido. Debe tener 11 dígitos.')
                .required('Campo requerido'),
            })}
            initialValues={elementActive ? elementActive : initialValues}
            enableReinitialize={true}
            onSubmit={async (values: IEmpresa) => {
              try {
                if (elementActive) {
                  await apiEmpresa.put(`${URL}/empresas`, elementActive.id, values);
                } else {
                  await apiEmpresa.post(`${URL}/empresas`, values);
                }
                getEmpresas();
                handleClose();
              } catch (error) {
                console.error('Error al enviar los datos:', error);
              }
            }}>
            {({errors, touched}) => (
              <>
                <Form autoComplete="off" className="form-obraAlta">
                  <div className="container_Form_Ingredientes">
                    <TextFieldValue label="Nombre" name="nombre" type="text" placeholder="Nombre" />
                  
                    
                    <TextFieldValue label="Razón Social" name="razonSocial" type="text" placeholder="Razón Social" />
                 
                    
                    <TextFieldValue label="CUIL" name="cuil" type="text" placeholder="Ejemplo: 12345678901" />
                    
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button variant="outline-success" type="submit" disabled={Object.keys(errors).length > 0 && Object.keys(touched).length > 0}>
                      Enviar
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};
