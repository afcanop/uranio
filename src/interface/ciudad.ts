export interface Ciudad {
  id: number;
  nombre: string;
}

export interface RespuestaCiudadBuscar {
  error: boolean;
  ciudades: Ciudad[];
}
