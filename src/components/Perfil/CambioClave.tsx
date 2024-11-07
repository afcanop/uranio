import React, {useState} from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootState} from 'store/reducers';
import {useSelector} from 'react-redux';
import {consultarApi} from 'utils/api';
import {useNavigation} from '@react-navigation/native';
import {
  RespuestaUsuarioCambioClave,
  RespuestaUsuarioRecuperarClave,
} from 'interface/usuario';
import {validarCorreoElectronico} from 'utils/funciones';
import { ToastTituloError } from 'utils/const';

const CambioClave = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState<String>('');
  const [codigo, setCodigo] = useState<String>('');

  const [confirmarClave, setConfirmarClave] = useState<String>('');
  const [mostrarClave, setMostrarClave] = useState<boolean>(false);
  const [mostrarConfirmarClave, setMostrarConfirmarClave] =
    useState<boolean>(false);

  const guardarContrasena = async () => {
    if (clave.length >= 8 && confirmarClave.length >= 8) {
      if (clave === confirmarClave) {
        try {
          const {status} = await consultarApi<RespuestaUsuarioCambioClave>(
            'api/usuario/cambio_clave',
            {
              codigo,
              nuevaClave: clave,
            },
          );
          if (status === 200) {
            toast.show({
              title: 'Correcto',
              description: 'Se ha actualizado correctamente la contraseña',
            });
            navigation.goBack();
          }
        } catch (error: any) {
          toast.show({
            title: ToastTituloError,
            description: error.response.data.mensaje,
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

  const confirmarCorreo = async () => {
    if (validarCorreoElectronico(correo)) {
      const {status} = await consultarApi<RespuestaUsuarioRecuperarClave>(
        'api/usuario/recuperar_clave',
        {usuario: correo},
        {
          requiereToken: false,
        },
      );
      if (status === 200) {
        setStep(2);
        toast.show({
          title: 'Correcto',
          description:
            'Se ha enviado un correo electrónico con a información de recuperación de contraseña',
        });
      }
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: 'El correo válido',
      });
    }
  };

  const validarCodigo = async () => {
    if (correo) {
      setStep(3);
    }
  };

  return (
    <Box flex={1} padding={2}>
      <VStack space={3} mt="5">
        {step === 1 && (
          <Text fontWeight="400">
            Ingresa tu correo electrónico para comenzar
          </Text>
        )}
        {step === 2 && (
          <Text fontWeight="400">
            Ingresa el código de verificación enviado a tu correo
          </Text>
        )}
        {step === 3 && (
          <Text fontWeight="400">Ingresa tu nueva contraseña</Text>
        )}
        <ScrollView>
          {step === 1 && (
            <>
              <FormControl isRequired={true}>
                <FormControl.Label
                  _text={{
                    color: 'coolGray.800',
                    fontSize: 'md',
                    fontWeight: 500,
                  }}>
                  Correo
                </FormControl.Label>
                <Input
                  keyboardType={'email-address'}
                  onChangeText={valor => setCorreo(valor)}
                />
              </FormControl>
              <Button mt="2" onPress={() => confirmarCorreo()}>
                Guardar
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <FormControl isRequired={true}>
                <FormControl.Label
                  _text={{
                    color: 'coolGray.800',
                    fontSize: 'md',
                    fontWeight: 500,
                  }}>
                  Codigo
                </FormControl.Label>
                <Input
                  keyboardType={'email-address'}
                  onChangeText={valor => setCodigo(valor)}
                />
              </FormControl>
              <Button mt="2" onPress={() => validarCodigo()}>
                Guardar
              </Button>
            </>
          )}

          {step === 3 && (
            <>
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
                      onPress={() =>
                        setMostrarConfirmarClave(!mostrarConfirmarClave)
                      }
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
            </>
          )}
        </ScrollView>
      </VStack>
    </Box>
  );
};

export default CambioClave;
