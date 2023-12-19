// store/rootReducer.ts
import usuarioInformacionReducer from '../reducers/usuarioReducer';
import tiendaReducer from '../reducers/tiendaReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  usuario: usuarioInformacionReducer,
  tienda: tiendaReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
