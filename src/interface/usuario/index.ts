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
