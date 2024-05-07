import { configureStore } from '@reduxjs/toolkit'
import EmpresaReducer from '../slices/EmpresaReducer'
import ModalReducer from '../slices/ModalReducer'
import SucursalReducer from '../slices/SucursalReducer'
import TablaReducer from '../slices/TablaReducer'
import ProductoReducer from '../slices/ProductoReducer'
import PromocionReducer from '../slices/PromocionReducer'
import InsumoReducer from '../slices/InsumoReducer'
import CategoriaReducer from '../slices/CategoriaReducer'


export const store = configureStore({
  reducer: {
    empresa: EmpresaReducer,
    modal: ModalReducer,
    sucursal: SucursalReducer,
    tabla: TablaReducer,
    producto: ProductoReducer,
    promocion: PromocionReducer,
    insumo: InsumoReducer,
    categoria: CategoriaReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch