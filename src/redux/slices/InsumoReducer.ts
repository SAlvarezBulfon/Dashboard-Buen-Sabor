import Insumo from '../../types/ArticuloInsumo';
import { createGenericSlice } from './GenericReducer';

const insumoSlice = createGenericSlice<Insumo[]>('insumoState', { data: [] });

export const { setData: setInsumo, resetData: resetInsumo } = insumoSlice.actions;

export default insumoSlice.reducer;