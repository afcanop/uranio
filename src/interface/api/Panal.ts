import {Panal} from 'interface/panal';

export interface RespuestaPanelBuscar {
  error: boolean;
  errorMensaje?: string;
  panales: Panal[];
}
