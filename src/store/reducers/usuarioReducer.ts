import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Usuario} from '../../interface/usuario';

const initialState: Usuario = {
  autentificacion: false,
  codigo: null,
  estadoHabilitado: null,
  fechaHabilitacion: null,
  operador: null,
  correo: null,
  celular: null,
  urlFoto: null,
  tokenFireBase: null,
  nombre: null,
  codigoOperacion: null,
  operadorActual: '',
  puntoServicio: '',
  puntoServicioToken: '',
  urlImagen: '',
  habilitadoConfiguracion: false,
  codigoCelda: null,
  codigoPanal: null,
  codigoCiudad: null,
  codigoPuesto: null,
  codigoTercero: null,
  calidadImagen: '',
  celda: '',
  tienda: false,
  oferta: false,
  panalNombre: '',
  ciudadNombre: '',
};

const usuarioInformacionSlice = createSlice({
  name: 'usuarioInformacion',
  initialState,
  reducers: {
    setUsuarioInformacion: (state, action: PayloadAction<Usuario>) => {
      return {
        ...state,
        autentificacion: true,
        codigo: action.payload.codigo,
        estadoHabilitado: action.payload.estadoHabilitado,
        fechaHabilitacion: action.payload.fechaHabilitacion,
        tokenFireBase: action.payload.tokenFireBase,
        nombre: action.payload.nombre,
        operador: action.payload.operador,
        puntoServicio: action.payload.puntoServicio,
        puntoServicioToken: action.payload.puntoServicioToken,
        urlImagen: action.payload.urlImagen,
        codigoOperacion: action.payload.codigoOperacion,
        habilitadoConfiguracion: action.payload.habilitadoConfiguracion,
        codigoCelda: action.payload.codigoCelda,
        codigoPanal: action.payload.codigoPanal,
        codigoCiudad: action.payload.codigoCiudad,
        codigoPuesto: action.payload.codigoPuesto,
        codigoTercero: action.payload.codigoTercero,
        calidadImagen: action.payload.calidadImagen,
        celda: action.payload.celda,
        tienda: action.payload.tienda,
        oferta: action.payload.oferta,
      };
    },
    actualizarUsuarioInformacion: (
      state,
      action: PayloadAction<Partial<Usuario>>,
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    cerrarSesionUsuario: () => {
      return initialState;
    },
  },
});

export const {
  setUsuarioInformacion,
  actualizarUsuarioInformacion,
  cerrarSesionUsuario,
} = usuarioInformacionSlice.actions;

export default usuarioInformacionSlice.reducer;
