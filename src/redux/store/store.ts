import { configureStore } from '@reduxjs/toolkit'
import EmpresaReducer from '../slices/EmpresaReducer'
import ModalReducer from '../slices/ModalReducer'
import SucursalReducer from '../slices/SucursalReducer'
import ProductoReducer from '../slices/ProductoReducer'
import PromocionReducer from '../slices/PromocionReducer'
import InsumoReducer from '../slices/InsumoReducer'
import CategoriaReducer from '../slices/CategoriaReducer'
import UnidadMedidaReducer from '../slices/UnidadMedidaReducer'


export const store = configureStore({
  reducer: {
    empresa: EmpresaReducer,
    modal: ModalReducer,
    sucursal: SucursalReducer,
    producto: ProductoReducer,
    promocion: PromocionReducer,
    insumo: InsumoReducer,
    categoria: CategoriaReducer,
    unidadMedida: UnidadMedidaReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch