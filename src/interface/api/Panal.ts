import {Panal} from 'interface/panal';

export interface RespuestaPanelBuscar {
  error: boolean;
  errorMensaje?: string;
  panales: Panal[];
}

export interface RespuestaAsignarPanal {
  error: boolean;
  errorMensaje?: string;
  ciudad?: number;
  oferta?: boolean;
  panal?: number;
  tienda?: boolean;
}
