import Categoria from '../../types/Categoria';
import { createGenericSlice } from './GenericReducer';

const categoriaSlice = createGenericSlice<Categoria[]>('categoriaState', { data: [] });

export const { setData: setCategoria, resetData: resetCategoria } = categoriaSlice.actions;

export default categoriaSlice.reducer;