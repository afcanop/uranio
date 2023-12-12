export interface CasoTipo {
  codigoCasoTipoPk: string;
  nombre: string;
}

export interface respuestaCasoTipoLista {
  casosTipos: CasoTipo[];
  error: boolean;
  errorMensaje?: string;
}
