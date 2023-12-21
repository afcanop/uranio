import {Image, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Box,
  Button,
  FormControl,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Toast,
  VStack,
  useToast,
} from 'native-base';
import HojaDeEstiloGenerales from '../../assets/HojaDeEstiloGenerales';
import {fechaActual, validarCorreoElectronico} from '../../utils/funciones';
import {consultarApi} from '../../utils/api';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Contenedor from '../../common/Contenedor';
import {
  actualizarUsuarioInformacion,
  setUsuarioInformacion,
} from '../../store/reducers/usuarioReducer';
import {
  RespuestaUsuarioAutenticar,
  RespuestaUsuarioDetalle,
} from 'interface/usuario';
import {
  actualizarRegistroFireBase,
  crearRegistroFireBase,
  obtenerTokenFirebase,
} from 'utils/services/firebase';
import database from '@react-native-firebase/database';

const Login = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [mostrarClave, setMostrarClave] = useState(false);
  const [inicioOffline, setInicioOffline] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={HojaDeEstiloGenerales.headerTitle} textAlign={'center'}>
          Veeci
        </Text>
      ),
    });
  }, [navigation]);

  const iniciarSesion = async () => {
    if (usuario !== '' && clave !== '') {
      if (validarCorreoElectronico(usuario)) {
        if (clave.length >= 8) {
          try {
            const tokenFirebase = await obtenerTokenFirebase();
            const respuestaApiLogin: RespuestaUsuarioAutenticar =
              await consultarApi('api/usuario/autenticar', {
                usuario,
                clave,
                ...{tokenFirebase},
              });

            if (respuestaApiLogin.autenticar) {
              let informacionUsuario = {
                ...respuestaApiLogin.usuario,
                tokenFireBase: tokenFirebase,
              };

              const respuestaApiUsuarioDetalle: RespuestaUsuarioDetalle =
                await consultarApi('api/usuario/detalle', {
                  codigoUsuario: respuestaApiLogin.usuario.codigo,
                });

              /*
                let consultaFireBase = await database()
                  .ref(`/session/${informacionUsuario.codigo}`)
                  .once('value');
                const informacionFirebase = await consultaFireBase._snapshot.value;
                if (informacionFirebase) {
                  actualizarRegistroFireBase(informacionUsuario.codigo, {
                    fechaAutenticacion: `${fechaActual().fecha} ${
                      fechaActual().hora
                    }`,
                    token: tokenFirebase,
                  });
                } else {
                  crearRegistroFireBase(
                    informacionUsuario.codigo,
                    tokenFirebase,
                  );
                }
                */
              dispatch(setUsuarioInformacion(informacionUsuario));
              // dispatch(
              //   actualizarUsuarioInformacion(respuestaApiUsuarioDetalle),
              // );
            } else {
              toast.show({
                title: 'Algo ha salido mal',
                description: 'error al autenticar',
              });
            }
          } catch (error) {
            toast.show({
              title: 'Algo ha salido mal',
              description:
                'Error al conectar al servidor, por favor comprobar su conexión a internet',
            });
          }
        } else {
          toast.show({
            title: 'Algo ha salido mal',
            description: 'La clave debe tener 8 o más caracteres',
          });
        }
      } else {
        toast.show({
          title: 'Algo ha salido mal',
          description: 'El usuario no es un correo válido',
        });
      }
    } else {
      Toast.show({
        title: 'Algo ha salido mal',
        description: 'Usuario y contraseña no tiene información',
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Contenedor>
            <VStack space={3} mt="5">
              <Box mt="5" alignItems="center" justifyContent="center">
                <Image
                  style={{width: 128, height: 128}}
                  source={require('../../assets/img/logo-fondo-blanco.png')}
                />
              </Box>
            </VStack>
            <FormControl>
              <FormControl.Label
                _text={{
                  color: 'coolGray.800',
                  fontSize: 'md',
                  fontWeight: 500,
                }}>
                Correo electronico
              </FormControl.Label>
              <Input
                type="text"
                onChangeText={valor => setUsuario(valor)}
                autoCapitalize={'none'}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{
                  color: 'coolGray.800',
                  fontSize: 'md',
                  fontWeight: 500,
                }}>
                Contraseña
              </FormControl.Label>
              <Input
                type={mostrarClave ? 'text' : 'password'}
                onChangeText={valor => setClave(valor)}
                InputRightElement={
                  <TouchableOpacity
                    onPress={() => setMostrarClave(!mostrarClave)}
                    style={{marginHorizontal: 5}}>
                    {mostrarClave == false ? (
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
            <VStack space={3} mt={2}>
              <Button onPress={() => iniciarSesion()}>Ingresar</Button>
              <Button
                onPress={() => navigation.navigate('CrearCuenta')}
                variant="link">
                Crear cuenta
              </Button>
              <Button
                onPress={() => navigation.navigate('OlvidoClave')}
                variant="link">
                ¿Olvidaste la contraseña?
              </Button>
            </VStack>
          </Contenedor>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
