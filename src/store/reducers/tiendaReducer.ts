// tiendaSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Carrito, Producto, TiendaState} from 'interface/tienda';

const tiendaSlice = createSlice({
  name: 'tienda',
  initialState: {
    productos: [],
    carrito: [],
    totalCarrito: 0,
  } as TiendaState,
  reducers: {
    setProductos: (state, action: PayloadAction<Producto[]>) => {
      state.productos = action.payload;
    },
    agregarAlCarrito: (state, action: PayloadAction<any>) => {
      const producto = state.carrito.find(
        (item: Carrito) => item.codigoItemPk === action.payload.codigoItemPk,
      );
      if (producto === undefined) {
        state.carrito.push({
          ...action.payload,
          ...{
            cantidadAgregada: 0,
            subtotal: 0,
          },
        });
      }
    },
    actualizarCantidadEnCarrito: (
      state,
      action: PayloadAction<{productoId: number; cantidadAgregada: number}>,
    ) => {
      const {productoId, cantidadAgregada} = action.payload;
      const productoEnCarrito = state.carrito.find(
        item => item.codigoItemPk === productoId,
      );

      if (productoEnCarrito) {
        // Si el producto ya está en el carrito, actualiza su cantidad
        productoEnCarrito.cantidadAgregada = cantidadAgregada;
        // Si el producto ya está en el carrito, actualiza el subtotal
        productoEnCarrito.subtotal =
          cantidadAgregada * productoEnCarrito.precio;
        //Actualizar el total del carrito
        state.totalCarrito = state.carrito.reduce(
          (total, producto) => total + producto.subtotal,
          0,
        );
        //state.totalCarrito = 1000;
      } else {
        // Si el producto no está en el carrito, agrégalo con la cantidad proporcionada
        const producto = state.productos.find(
          item => item.codigoItemPk === productoId,
        );
        if (producto) {
          state.carrito.push({
            ...producto,
            cantidadAgregada,
            subtotal: 0,
          });

          // Actualizar el total del carrito después de agregar un nuevo producto
          state.totalCarrito = state.carrito.reduce(
            (total, item) => total + item.subtotal,
            0,
          );
        }
      }
    },
    retirarDelCarrito: (state, action: PayloadAction<number>) => {
      const productoIdEliminar = action.payload;
      state.carrito = state.carrito.filter(
        item => item.codigoItemPk !== productoIdEliminar,
      );
      // Actualizar el total del carrito después de retirar un producto
      state.totalCarrito = state.carrito.reduce(
        (total, producto) => total + producto.subtotal,
        0,
      );
    },
  },
});

export const {
  setProductos,
  agregarAlCarrito,
  actualizarCantidadEnCarrito,
  retirarDelCarrito,
} = tiendaSlice.actions;

export const selectProductos = (state: {tienda: TiendaState}) =>
  state.tienda.productos;
export const selectCarrito = (state: {tienda: TiendaState}) =>
  state.tienda.carrito;
export const selectCantidadProductosEnCarrito = (state: {
  tienda: TiendaState;
}) => state.tienda.carrito.length;

export default tiendaSlice.reducer;
