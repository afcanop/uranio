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

export interface respuestaPublicacionLista {
  error: boolean;
  errorMensaje?: string;
  publicaciones: Publicacion[];
}

export interface respuestaPublicacionNuevo {
  error: boolean;
  errorMensaje?: string;
  codigoPublicacion: number;
}
