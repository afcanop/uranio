export interface Caso {
  celular: string;
  codigoCasoPk: number;
  codigoCasoTipoFk: string;
  codigoUsuarioFk: number;
  correo: string;
  descripcion: string;
  estadoAtendido: boolean;
  estadoCerrado: boolean;
  fecha: string;
  fechaAtendido: any;
  nombre: string;
}

export interface respuestaCasoLista {
  casos: Caso[];
  error: boolean;
  errorMensaje?: string;
}

export interface respuestaCasoNuevo {
  codigoCaso: number;
  error: boolean;
  errorMensaje?: string;
}
