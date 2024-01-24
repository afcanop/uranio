export interface Publicacion {
  codigoPublicacionPk: number;
  fecha: string;
  comentario: string;
  urlImagen: string;
  reacciones: number;
  comentarios: number;
  permiteComentario: boolean;
  codigoUsuarioFk: number;
  usuarioUrlImagen: string;
  usuario: string;
  usuarioNombre: string;
}

export interface RespuestaPublicacionLista {
  error: boolean;
  errorMensaje?: string;
  publicaciones: Publicacion[];
}

export interface RespuestaPublicacionNuevo {
  error: boolean;
  errorMensaje?: string;
  codigoPublicacion: number;
}
