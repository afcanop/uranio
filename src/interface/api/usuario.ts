import {Usuario} from 'interface/usuario';

export interface RespuestaUsuarioAutenticar {
  error: boolean;
  errorMensaje?: string;
  autenticar: boolean;
  usuario: Usuario;
}

export interface RespuestaAsignarPanal {
  error: boolean;
  errorMensaje?: string;
  ciudad?: number;
  oferta?: boolean;
  panal?: number;
  tienda?: boolean;
}

export interface RespuestaUsuarioDesvincularPanal {
  error: boolean;
  errorMensaje?: string;
}

export interface RespuestaUsuarioRecuperarClave {
  error: boolean;
  errorMensaje?: string;
}

export interface RespuestaUsuarioNuevo {
  error: boolean;
  errorMensaje?: string;
}
