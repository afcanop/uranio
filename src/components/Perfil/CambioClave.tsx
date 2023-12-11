import React, {useState} from 'react';
import {Box, Button, FormControl, Input, VStack, useToast} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootState} from 'store/reducers';
import {useSelector} from 'react-redux';
import {consultarApi} from 'utils/api';
import {useNavigation} from '@react-navigation/native';
import {RespuestaUsuarioCambioClave} from 'interface/api/usuario';

const CambioClave = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [clave, setClave] = useState<String>('');
  const [confirmarClave, setConfirmarClave] = useState<String>('');
  const [mostrarClave, setMostrarClave] = useState<boolean>(false);
  const [mostrarConfirmarClave, setMostrarConfirmarClave] =
    useState<boolean>(false);
  const codigoUsuario = useSelector((state: RootState) => state.usuario.codigo);

  const guardarContrasena = async () => {
    if (clave.length >= 8 && confirmarClave.length >= 8) {
      if (clave === confirmarClave) {
        const respuestaApiCambiarcontrasena: RespuestaUsuarioCambioClave =
          await consultarApi('api/usuario/cambiarclave', {
            codigoUsuario,
            claveNueva: clave,
          });
        if (respuestaApiCambiarcontrasena.error === false) {
          toast.show({
            title: 'Correcto',
            description: 'Se ha actualizado correctamente la contraseña',
          });
          navigation.goBack();
        } else {
          toast.show({
            title: 'Algo ha salido mal',
            description: respuestaApiCambiarcontrasena.errorMensaje,
          });
        }
      } else {
        toast.show({
          title: 'Algo ha salido mal',
          description: 'El campo clave y confirmar clave deben ser iguales',
        });
      }
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: 'La contraseña debe tener de mínimo 8 caracteres',
      });
    }
  };

  return (
    <Box flex={1} padding={2}>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Nueva clave</FormControl.Label>
          <Input
            type={mostrarClave ? 'text' : 'password'}
            onChangeText={(valor: string) => setClave(valor)}
            InputRightElement={
              <TouchableOpacity
                onPress={() => setMostrarClave(!mostrarClave)}
                style={{marginHorizontal: 5}}>
                {mostrarClave === false ? (
                  <Ionicons name={'eye-off-outline'} size={25} />
                ) : (
                  <Ionicons
                    name={'eye-outline'}
                    size={25}
                    color={'coolGray.800'}
                  />
                )}
              </TouchableOpacity>
            }
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Confirmar clave </FormControl.Label>
          <Input
            type={mostrarConfirmarClave ? 'text' : 'password'}
            onChangeText={(valor: string) => setConfirmarClave(valor)}
            InputRightElement={
              <TouchableOpacity
                onPress={() => setMostrarConfirmarClave(!mostrarConfirmarClave)}
                style={{marginHorizontal: 5}}>
                {mostrarConfirmarClave === false ? (
                  <Ionicons name={'eye-off-outline'} size={25} />
                ) : (
                  <Ionicons
                    name={'eye-outline'}
                    size={25}
                    color={'coolGray.800'}
                  />
                )}
              </TouchableOpacity>
            }
          />
        </FormControl>
        <Button mt="2" onPress={() => guardarContrasena()}>
          Confirmar
        </Button>
      </VStack>
    </Box>
  );
};

export default CambioClave;
