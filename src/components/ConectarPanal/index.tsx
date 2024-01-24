import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {
  Box,
  Button,
  Center,
  CheckIcon,
  FormControl,
  Link,
  Select,
  Text,
  useToast,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {consultarApi} from 'utils/api';
import {Ciudad, RespuestaCiudadBuscar} from 'interface/ciudad';
import {
  Panal,
  RespuestaPanalAsignar,
  RespuestaPanelBuscar,
} from 'interface/panal';
import colores from 'assets/theme/colores';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {
  actualizarUsuarioInformacion,
  cerrarSesionUsuario,
} from 'store/reducers/usuarioReducer';
import ContenedorAnimado from 'common/ContendorAnimado';
import {ToastTituloError} from 'utils/const';

const ConectarPanal = () => {
  const [ciudad, setCiudad] = useState<string>('');
  const [panal, setPanal] = useState<string>('');
  const [arrCiudades, setArrCiudades] = useState<Ciudad[]>([]);
  const [arrPanales, setArrPanales] = useState<Panal[]>([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();

  const usuarioCodigo = useSelector((state: RootState) => state.usuario.id);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarCiudades();
      unsubscribe();
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => cerrarSession()}>
          <Ionicons name={'exit-outline'} size={30} color={colores.blanco} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const cerrarSession = () => {
    Alert.alert(
      'Cerrar sesión',
      'Esta seguro de cerrar la sesión',
      [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => dispatch(cerrarSesionUsuario()),
        },
      ],
      {cancelable: true},
    );
  };

  const consultarCiudades = async () => {
    const {status, respuesta} = await consultarApi<RespuestaCiudadBuscar>(
      'api/ciudad/buscar',
      null,
    );
    if (status === 200) {
      setArrCiudades(respuesta.ciudades);
    }
  };

  const consultarPaneles = async (ciudadSeleccionada: any) => {
    const {status, respuesta} = await consultarApi<RespuestaPanelBuscar>(
      'api/panal/buscar',
      {
        nombre: '',
        codigoCiudad: ciudadSeleccionada,
      },
    );
    if (status === 200) {
      setArrPanales(respuesta.panales);
    } else {
    }
  };

  const asignarPanal = async () => {
    try {
      const {status, respuesta} = await consultarApi<RespuestaPanalAsignar>(
        'api/panal/asignar',
        {
          codigoUsuario: usuarioCodigo,
          codigoPanal: parseInt(panal, 10),
          codigoCiudad: parseInt(ciudad, 10),
        },
      );
      if (status === 200) {
        dispatch(
          actualizarUsuarioInformacion({
            ciudadId: respuesta.ciudad,
            oferta: respuesta.oferta,
            panalId: respuesta.panal,
            tienda: respuesta.tienda,
          }),
        );
      }
    } catch (error: any) {
      toast.show({
        title: ToastTituloError,
        description: error.response.data.mensaje,
      });
    }
  };

  const btnConnectar = ciudad === '' && panal === '';

  return (
    <KeyboardAvoidingView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box flex={1} padding={2}>
          <Center>
            <ContenedorAnimado delay={100}>
              <Image
                style={{width: 128, height: 128}}
                source={require('../../assets/img/logo-fondo-blanco.png')}
              />
            </ContenedorAnimado>
          </Center>
          <ContenedorAnimado delay={200}>
            <FormControl>
              <FormControl.Label>Ciudad</FormControl.Label>
              <Select
                selectedValue={ciudad}
                accessibilityLabel="Seleccionar ciudad"
                placeholder="Seleccionar ciudad"
                _selectedItem={{
                  bg: 'teal.600',
                  color: 'white',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={itemValue => {
                  setCiudad(itemValue);
                  consultarPaneles(itemValue);
                }}>
                {arrCiudades.map((item: Ciudad) => (
                  <Select.Item
                    label={item.nombre}
                    value={`${item.id}`}
                    key={`${item.id}`}
                  />
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormControl.Label>Panal</FormControl.Label>
              <Select
                selectedValue={panal}
                accessibilityLabel="Seleccionar panal"
                placeholder="Seleccionar panal"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={itemValue => setPanal(itemValue)}>
                {arrPanales.map((item: Panal) => (
                  <Select.Item label={item.nombre} value={`${item.id}`} />
                ))}
              </Select>
            </FormControl>
            <Button
              mt="2"
              isDisabled={btnConnectar}
              onPress={() => asignarPanal()}>
              Connectar
            </Button>
          </ContenedorAnimado>
          <ContenedorAnimado delay={300}>
            <Center>
              <TouchableOpacity
                onPress={() => navigation.navigate('ConectarPanalQr')}>
                <Text my={5}>O leer qr</Text>
                <Ionicons
                  name={'qr-code-outline'}
                  size={60}
                  color={colores.primary}
                />
              </TouchableOpacity>

              <Link my={5}>No encuentras tu panal</Link>
            </Center>
          </ContenedorAnimado>
          <ContenedorAnimado delay={400}>
            <Text>
              Si no encuentras tu panal, escríbenos, estamos vinculando nuevos
              panales a nuestra comunidad; disfruta de los servicios como
              anuncios de paquetes con foto, visitantes, servicios dentro de la
              unidad (electricistas, fontaneros, paseo de mascotas), votaciones
              para tomar las decisiones entre todos los miembros del panal,
              publicar artículos que tengas para la venta, tienda que te entrega
              en tiempo récord y muchas otras cosas más, No te pierdas la
              oportunidad de estar. ¿Qué es un panal? Un panal es tu unidad
              residencial, edificio, condominio y las celdas pueden ser tu
              oficina, apartamento, o finca
            </Text>
            <Center>
              <Image
                style={{width: 128, height: 128}}
                source={require('../../assets/img/cuestionario.png')}
              />
            </Center>
          </ContenedorAnimado>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ConectarPanal;
