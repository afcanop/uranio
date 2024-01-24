export interface Usuario {
  autentificacion: boolean;
  celda: string | null;
  celdaId: number | null;
  celular: string | null;
  ciudadId: number | null;
  ciudadNombre: string;
  codigoOperacion: number | null;
  calidadImagen: string | null;
  correo: string | null;
  estadoHabilitado: any | null;
  fechaHabilitacion: any | null;
  habilitadoConfiguracion: boolean;
  id: number | null;
  nombre: string | null;
  oferta: boolean;
  operador: string | null;
  operadorActual: string;
  panalId: number | null;
  panalNombre: string;
  puntoServicio: string;
  puntoServicioToken: string;
  tienda: boolean;
  tokenFireBase: string | null;
  tokenJwt: string | null;
  urlFoto: string | null;
  urlImagen: string;
}

export interface RespuestaUsuarioAutenticar {
  error: boolean;
  errorMensaje?: string;
  token: string;
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

export interface RespuestaUsuarioDetalle {
  error: boolean;
  errorMensaje?: string;
  codigoUsuario: number;
  usuario: string;
  nombre: string;
  codigoPanalFk: number;
  codigoCeldaFk: number;
  celular: string;
  panalNombre: string;
  celda: string;
  codigoCiudadFk: number;
  ciudadNombre: string;
  urlImagen: string;
}

export interface RespuestaUsuarioEditarinformacion {
  error: boolean;
  errorMensaje?: string;
}

export interface RespuestaUsuarioCambioClave {
  error: boolean;
  errorMensaje?: string;
}

export interface RespuestaUsuarioCambioImagen {
  error: boolean;
  errorMensaje?: string;
  urlImagen: string;
}
