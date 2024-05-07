import Sucursal from '../../types/Sucursal';
import { createGenericSlice } from './GenericReducer';


const sucursalSlice = createGenericSlice<Sucursal[]>('sucursalState', { data: [] });

export const { setData: setSucursal, resetData: resetSucursal } = sucursalSlice.actions;

export default sucursalSlice.reducer;