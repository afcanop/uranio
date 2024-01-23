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
import {validarCorreoElectronico} from '../../utils/funciones';
import {consultarApi} from '../../utils/api';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Contenedor from '../../common/Contenedor';
import {RespuestaUsuarioAutenticar} from 'interface/usuario';
import {obtenerTokenFirebase} from 'utils/services/firebase';
import ContenedorAnimado from 'common/ContendorAnimado';
import {setUsuarioInformacion} from 'store/reducers/usuarioReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastTituloError} from 'utils/const';
import colores from 'assets/theme/colores';

const Login = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [mostrarClave, setMostrarClave] = useState<boolean>(false);
  const [mostrarAnimacionCargando, setMostrarAnimacionCargando] =
    useState<boolean>(false);

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
    setMostrarAnimacionCargando(true);
    if (usuario !== '' && clave !== '') {
      if (validarCorreoElectronico(usuario)) {
        if (clave.length >= 8) {
          try {
            const {status, respuesta} =
              await consultarApi<RespuestaUsuarioAutenticar>(
                'api/login_check',
                {
                  username: usuario,
                  password: clave,
                },
                {
                  method: 'post',
                  requiereToken: false,
                },
              );
            if (status === 200) {
              //guardar token
              await AsyncStorage.setItem('jwtToken', respuesta.token);
              consultarUsuarioDetalle();
            } else {
              toast.show({
                title: ToastTituloError,
                description: 'error al autenticar',
              });
            }
          } catch (error: any) {
            setMostrarAnimacionCargando(false);
            toast.show({
              title: ToastTituloError,
              description: error.response.data.mensaje,
            });
          }
        } else {
          setMostrarAnimacionCargando(false);
          toast.show({
            title: ToastTituloError,
            description: 'La clave debe tener 8 o más caracteres',
          });
        }
      } else {
        setMostrarAnimacionCargando(false);
        toast.show({
          title: ToastTituloError,
          description: 'El usuario no es un correo válido',
        });
      }
    } else {
      setMostrarAnimacionCargando(false);
      Toast.show({
        title: ToastTituloError,
        description: 'Usuario y contraseña no tiene información',
      });
    }
  };

  const consultarUsuarioDetalle = async () => {
    try {
      const tokenFirebase = await obtenerTokenFirebase();

      const {status, respuesta} =
        await consultarApi<RespuestaUsuarioAutenticar>('api/usuario/detalle', {
          usuario: usuario,
          tokenFirebase,
        });
      if (status === 200) {
        dispatch(setUsuarioInformacion(respuesta.usuario));
      } else {
        setMostrarAnimacionCargando(false);
        toast.show({
          title: ToastTituloError,
          description: 'error al autenticar',
        });
      }
    } catch (error: any) {
      setMostrarAnimacionCargando(false);
      toast.show({
        title: ToastTituloError,
        description: error.response.data.mensaje,
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
                <ContenedorAnimado delay={100}>
                  <Image
                    style={{width: 128, height: 128}}
                    source={require('../../assets/img/logo-fondo-blanco.png')}
                  />
                </ContenedorAnimado>
              </Box>
            </VStack>
            <ContenedorAnimado delay={200}>
              <FormControl>
                <FormControl.Label
                  _text={{
                    color: colores.negro,
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
                    color: colores.negro,
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
                      <Ionicons
                        name={mostrarClave ? 'eye-outline' : 'eye-off-outline'}
                        size={25}
                        color={colores.gris}
                      />
                    </TouchableOpacity>
                  }
                />
              </FormControl>
              <VStack space={3} mt={2}>
                <Button
                  onPress={() => iniciarSesion()}
                  isLoading={mostrarAnimacionCargando}
                  isLoadingText="Cargando">
                  Ingresar
                </Button>
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
            </ContenedorAnimado>
          </Contenedor>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
