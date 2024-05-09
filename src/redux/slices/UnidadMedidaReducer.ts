import UnidadMedida from '../../types/UnidadMedida';
import { createGenericSlice } from './GenericReducer';

const unidadMedidaSlice = createGenericSlice<UnidadMedida[]>('unidadMedidaState', { data: [] });

export const { setData: setUnidadMedida, resetData: resetUnidadMedida } = unidadMedidaSlice.actions;

export default unidadMedidaSlice.reducer;