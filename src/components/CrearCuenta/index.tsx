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
import ContenedorAnimado from 'common/ContendorAnimado';
import {ToastTituloError, ToastTituloExito} from 'utils/const';

function CrearCuenta() {
  const toast = useToast();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [celular, setCelular] = useState('');
  const [mostrarclave, setMostrarContrasena] = useState<boolean>(false);
  const [mostrarAnimacionCargando, setMostrarAnimacionCargando] =
    useState<boolean>(false);
  const navigation = useNavigation();

  const crearUsuario = async () => {
    setMostrarAnimacionCargando(true);

    if (usuario !== '' || clave !== '' || celular !== '') {
      if (validarCorreoElectronico(usuario)) {
        if (clave.length >= 8) {
          try {
            const {status} = await consultarApi<RespuestaUsuarioNuevo>(
              'api/usuario/registro',
              {
                email: usuario,
                password: clave,
                celular,
              },
              {
                requiereToken: false,
              },
            );
            if (status === 200) {
              navigation.goBack();
              toast.show({
                title: ToastTituloExito,
                description: 'Creación de usuario exitoso',
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
            description: 'La clave debe de tener más 8 caracteres',
          });
        }
      } else {
        setMostrarAnimacionCargando(false);
        toast.show({
          title: ToastTituloError,
          description: 'El no correo válido',
        });
      }
    } else {
      setMostrarAnimacionCargando(false);
      toast.show({
        title: ToastTituloError,
        description:
          'Por favor, completa al menos uno de los siguientes campos: Usuario, Clave o Número de Celular.',
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
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
            <ContenedorAnimado delay={200}>
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
              <Button
                mt="2"
                isLoading={mostrarAnimacionCargando}
                isLoadingText="Cargando"
                onPress={() => crearUsuario()}>
                Guardar
              </Button>
            </ContenedorAnimado>
          </VStack>
        </Contenedor>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CrearCuenta;
