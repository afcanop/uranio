interface Producto {
  id: number;
  nombre: string;
  precio: number;
  // Agrega otros campos según sea necesario
}

interface TiendaState {
  productos: Producto[];
  carrito: Producto[];
}

export {Producto, TiendaState};
