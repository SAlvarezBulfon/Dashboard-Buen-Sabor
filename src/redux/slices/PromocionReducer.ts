import Promocion from '../../types/Promocion';
import { createGenericSlice } from './GenericReducer';

const promocionSlice = createGenericSlice<Promocion[]>('promocionState', { data: [] });

export const { setData: setPromocion, resetData: resetPromocion } = promocionSlice.actions;

export default promocionSlice.reducer;