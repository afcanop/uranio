export interface Comentario {
  codigoComentarioPk: number;
  fecha: string;
  comentario: string;
  codigoUsuarioFk: number;
  usuarioUrlImagen: string;
  usuario: string;
  usuarioNombre: string;
}

export interface RespuestaComentarioLista {
  error: boolean;
  errorMensaje?: string;
  comentarios: Comentario[];
}

export interface RespuestaComentarioNuevo {
  error: boolean;
  errorMensaje?: string;
}
