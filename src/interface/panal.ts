export interface Panal {
  id: number;
  nombre: string;
}

export interface RespuestaPanelBuscar {
  error: boolean;
  errorMensaje?: string;
  panales: Panal[];
}

export interface RespuestaPanalAsignar {
  panal: number;
  ciudad: number;
  oferta: boolean;
  tienda: boolean;
}
