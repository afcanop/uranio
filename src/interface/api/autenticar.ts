import { Usuario } from "interface/usuario";

export interface RespuestaUsuarioAutenticar {
    error: boolean;
    autenticar: boolean;
    usuario: Usuario;
}