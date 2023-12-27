export interface Categoria {
  codigoCatagoriaPk: string;
  nombre: string;
  urlImagen: string;
}

export interface respuestaCategoriaLista {
  error: boolean;
  errorMensaje?: string;
  categorias: Categoria[];
}

export interface respuestaCategoriaNuevo {
  error: boolean;
  errorMensaje?: string;
  codigoOferta: string;
}
