import React, {useState} from 'react';
import {Box, Button, FormControl, Input, VStack, useToast} from 'native-base';
import {RootState} from 'store/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {consultarApi} from 'utils/api';
import {RespuestaUsuarioEditarinformacion} from 'interface/usuario';
import {actualizarUsuarioInformacion} from 'store/reducers/usuarioReducer';

const InformacionPersonal = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const usuario = useSelector((state: RootState) => {
    return {
      codigo: state.usuario.id,
      nombre: state.usuario.nombre,
      celular: state.usuario.celular,
    };
  });
  const [nombre, setNombre] = useState<String | null>(usuario.nombre);
  const [celular, setCelular] = useState<String | null>(usuario.celular);

  const actualizarInformacion = async () => {
    if (nombre !== null && nombre !== null) {
      const respuestaApiEditarInformacion: RespuestaUsuarioEditarinformacion =
        await consultarApi('api/usuario/editarinformacion', {
          codigoUsuario: usuario.codigo,
          nombre,
          celular,
        });
      if (respuestaApiEditarInformacion.error === false) {
        dispatch(
          actualizarUsuarioInformacion({
            nombre,
            celular,
          }),
        );
        toast.show({
          title: 'Correcto',
          description: 'Información actualizada',
        });
      } else {
        toast.show({
          title: 'Algo ha salido mal',
          description: 'error al autenticar',
        });
      }
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: 'Los campos nombré y celular son requeridos',
      });
    }
  };

  return (
    <Box flex={1} padding={2}>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label isRequired>Nombre</FormControl.Label>
          <Input
            value={nombre}
            onChangeText={(text: String) => setNombre(text)}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label isRequired>Celular</FormControl.Label>
          <Input
            keyboardType="number-pad"
            value={celular}
            onChangeText={(text: String) => setCelular(text)}
          />
        </FormControl>
        <Button mt="2" onPress={() => actualizarInformacion()}>
          Confirmar
        </Button>
      </VStack>
    </Box>
  );
};

export default InformacionPersonal;
