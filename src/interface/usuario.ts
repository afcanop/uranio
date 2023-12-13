export interface Usuario {
  autentificacion: boolean;
  codigo: number | null;
  estadoHabilitado: any | null;
  fechaHabilitacion: any | null;
  operador: string | null;
  correo: string | null;
  celular: string | null;
  urlFoto: string | null;
  tokenFireBase: string | null;
  nombre: string | null;
  codigoOperacion: number | null;
  operadorActual: string;
  puntoServicio: string;
  puntoServicioToken: string;
  urlImagen: string;
  habilitadoConfiguracion: boolean;
  codigoCelda: number | null;
  codigoPanal: number | null;
  codigoCiudad: number | null;
  codigoPuesto: number | null;
  codigoTercero: number | null;
  calidadImagen: string | null;
  celda: string | null;
  tienda: boolean;
  oferta: boolean;
  panalNombre: string;
  ciudadNombre: string;
}
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
