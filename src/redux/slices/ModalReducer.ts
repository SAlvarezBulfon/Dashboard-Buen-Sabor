import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definimos el estado inicial del slice
interface IModalState {
  modal: boolean; // Estado del modal de categoría
}

const initialState: IModalState = {
  modal: false,
};

// Definimos la interfaz para la acción del payload
interface IPayloadAction {
  modalName: keyof IModalState; // Nombre del modal a modificar
}

// Creamos un slice con Redux Toolkit para manejar los modals
const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    toggleModal(state, action: PayloadAction<IPayloadAction>) {
      const { modalName } = action.payload;
      state[modalName] = !state[modalName];
    },
  },
});


export const { toggleModal } = modalsSlice.actions; // Exportamos la acción toggleModal
export default modalsSlice.reducer; // Exportamos el reducer del slice
