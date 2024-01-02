export interface Producto {
  codigoItemPk: number;
  nombre: string;
  precio: number;
  agregadoAlCarrito: boolean;
}

export interface ProductoCategorizado {
  [key: string]: {
    nombre: string;
    itemes: Producto[];
  };
}

export interface Carrito extends Producto {
  cantidadAgregada: number;
  precioTotal: number;
}

export interface TiendaState {
  productos: Producto[];
  carrito: Carrito[];
  totalCarrito: number;
}

export interface RespuestaItemBuscarItem {
  error: boolean;
  errorMensaje?: string;
  itemes: ProductoCategorizado;
}
export interface RespuestaItemLista {
  error: boolean;
  errorMensaje?: string;
  itemes: ProductoCategorizado;
}
