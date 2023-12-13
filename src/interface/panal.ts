export interface Panal {
  codigoPanalPk: number;
  nombre: string;
}

export interface RespuestaPanelBuscar {
  error: boolean;
  errorMensaje?: string;
  panales: Panal[];
}
