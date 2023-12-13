export interface Ciudad {
  codigoCiudadPk: number;
  nombre: string;
}

export interface RespuestaCiudadBuscar {
  error: boolean;
  ciudades: Ciudad[];
}
