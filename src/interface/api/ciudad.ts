import {Ciudad} from 'interface/Ciudad';

export interface RespuestaCiudadBuscar {
  error: boolean;
  ciudades: Ciudad[];
}
