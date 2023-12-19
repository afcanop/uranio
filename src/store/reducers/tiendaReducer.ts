// tiendaSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TiendaState} from './types';
import {Producto} from 'interface/tienda';

const tiendaSlice = createSlice({
  name: 'tienda',
  initialState: {
    productos: [],
    carrito: [],
  } as TiendaState, // Usa la interfaz como tipo de initialState
  reducers: {
    setProductos: (state, action: PayloadAction<Producto[]>) => {
      state.productos = action.payload;
    },
    agregarAlCarrito: (state, action: PayloadAction<number>) => {
      const producto = state.productos.find(
        (item: Producto) => item.id === action.payload,
      );
      if (producto) {
        state.carrito.push(producto);
      }
    },
  },
});

export const {setProductos, agregarAlCarrito} = tiendaSlice.actions;

export const selectProductos = (state: {tienda: TiendaState}) =>
  state.tienda.productos;
export const selectCarrito = (state: {tienda: TiendaState}) =>
  state.tienda.carrito;

export default tiendaSlice.reducer;
