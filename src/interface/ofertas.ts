export interface Oferta {
  codigoOfertaPk: number;
  fecha: string;
  descripcion: string;
  precio: number;
  urlImagen: string;
  codigoCategoriaFk: string;
  codigoUsuarioFk: number;
}

export interface respuestaOfertaLista {
  error: boolean;
  errorMensaje?: string;
  ofertas: Oferta[];
}
