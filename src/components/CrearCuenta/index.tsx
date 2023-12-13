import {
  Button,
  FormControl,
  Input,
  ScrollView,
  useToast,
  VStack,
  Box,
} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {validarCorreoElectronico} from '../../utils/funciones';
import {consultarApi} from '../../utils/api';
import {useNavigation} from '@react-navigation/native';
import Contenedor from 'common/Contenedor';
import {RespuestaUsuarioNuevo} from 'interface/usuario';

function CrearCuenta() {
  const toast = useToast();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [celular, setCelular] = useState('');
  const [mostrarclave, setMostrarContrasena] = useState(false);
  const navigation = useNavigation();

  const crearUsuario = async () => {
    if (validarCorreoElectronico(usuario)) {
      if (clave.length >= 8) {
        const respuestaApiUsuarioNuevo: RespuestaUsuarioNuevo =
          await consultarApi('api/usuario/nuevo', {
            usuario,
            clave,
            celular,
          });
        if (respuestaApiUsuarioNuevo.error === false) {
          navigation.goBack();
          toast.show({
            title: 'Correcto',
            description: 'Creación de usuario exitoso',
          });
        } else {
          toast.show({
            title: 'Algo ha salido mal',
            description: respuestaApiUsuarioNuevo.errorMensaje,
          });
        }
      } else {
        toast.show({
          title: 'Algo ha salido mal',
          description: 'La clave debe de tener más 8 caracteres',
        });
      }
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: 'El no correo válido',
      });
    }
  };

  const habilitarBtnGuardar = usuario === '' || clave === '' || celular === '';

  return (
    <SafeAreaView style={{flex: 1}}>
      <Contenedor>
        <VStack space={3} mt="5">
          <Box mt="5" alignItems="center" justifyContent="center">
            <Image
              style={{width: 128, height: 128}}
              source={require('../../assets/img/logo-fondo-blanco.png')}
            />
          </Box>
          <ScrollView>
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
                onChangeText={valor => setUsuario(valor)}
              />
            </FormControl>
            <FormControl isRequired={true}>
              <FormControl.Label
                _text={{
                  color: 'coolGray.800',
                  fontSize: 'md',
                  fontWeight: 500,
                }}>
                Celular
              </FormControl.Label>
              <Input
                keyboardType={'phone-pad'}
                onChangeText={valor => setCelular(valor)}
              />
            </FormControl>
            <FormControl isRequired={true}>
              <FormControl.Label
                _text={{
                  color: 'coolGray.800',
                  fontSize: 'md',
                  fontWeight: 500,
                }}>
                Contraseña
              </FormControl.Label>
              <Input
                type={mostrarclave ? 'text' : 'password'}
                onChangeText={valor => setClave(valor)}
                InputRightElement={
                  <TouchableOpacity
                    onPress={() => setMostrarContrasena(!mostrarclave)}
                    style={{marginHorizontal: 5}}>
                    {mostrarclave == false ? (
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
              />{' '}
            </FormControl>
          </ScrollView>
        </VStack>
        <Button
          mt="2"
          isDisabled={habilitarBtnGuardar}
          onPress={() => crearUsuario()}>
          Guardar
        </Button>
      </Contenedor>
    </SafeAreaView>
  );
}

export default CrearCuenta;
