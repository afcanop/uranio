import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Usuario} from '../../interface/usuario';

const initialState: Usuario = {
  autentificacion: false,
  estadoHabilitado: null,
  fechaHabilitacion: null,
  id: null,
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
  celdaId: null,
  panalId: null,
  ciudadId: null,
  calidadImagen: '',
  celdaCelda: '',
  tienda: false,
  oferta: false,
  panalNombre: '',
  ciudadNombre: '',
  tokenJwt: null,
  celda: '',
};

const usuarioSlice = createSlice({
  name: 'usuarioInformacion',
  initialState,
  reducers: {
    setUsuarioInformacion: (state, action: PayloadAction<Usuario>) => {
      return {
        ...state,
        autentificacion: true,
        id: action.payload.id,
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
        celdaId: action.payload.celdaId,
        panalId: action.payload.panalId,
        ciudadId: action.payload.ciudadId,
        calidadImagen: action.payload.calidadImagen,
        celdaCelda: action.payload.celdaCelda,
        tienda: action.payload.tienda,
        oferta: action.payload.oferta,
        tokenJwt: action.payload.tokenJwt,
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
} = usuarioSlice.actions;

export default usuarioSlice.reducer;
