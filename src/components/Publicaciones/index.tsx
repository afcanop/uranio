import {useNavigation} from '@react-navigation/native';
import colores from 'assets/theme/colores';
import {RespuestaCeldaAsignar, RespuestaCeldaLLave} from 'interface/celda';
import {
  Box,
  Button,
  CloseIcon,
  FormControl,
  HStack,
  IconButton,
  Input,
  Row,
  Stack,
  Text,
  VStack,
  useToast,
  Alert as Alertnb,
} from 'native-base';
import React, {useState} from 'react';
import {Alert, ScrollView, TouchableOpacity} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {StepIndicatorStyles} from 'react-native-step-indicator/lib/typescript/src/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {actualizarUsuarioInformacion} from 'store/reducers/usuarioReducer';
import {consultarApi} from 'utils/api';

const thirdIndicatorStyles: StepIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 20,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#7eaec4',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#7eaec4',
  stepStrokeUnFinishedColor: '#dedede',
  separatorFinishedColor: '#7eaec4',
  separatorUnFinishedColor: '#dedede',
  stepIndicatorFinishedColor: '#7eaec4',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#7eaec4',
};

export default function App() {
  const toast = useToast();
  const dispatch = useDispatch();
  const [paginaActual, setPaginaActual] = useState<number>(0);
  const [celda, setCelda] = useState<String>('');
  const navigation = useNavigation();

  const [codigoConfirmacion, setCodigoConfirmacion] = useState<String>('');
  const actualizarPaginaActual = (numero: number) => {
    setPaginaActual(paginaActual + numero);
  };
  const usuario = useSelector((state: RootState) => {
    return {
      codigo: state.usuario.codigo,
      panalNombre: state.usuario.panalNombre,
      codigoPanal: state.usuario.codigoPanal,
    };
  });

  const celdaLLave = async () => {
    const respuestaApiCeldaLLave: RespuestaCeldaLLave = await consultarApi(
      'api/celda/llave',
      {
        codigoUsuario: usuario.codigo,
        codigoPanal: usuario.codigoPanal,
        celda,
      },
    );

    if (respuestaApiCeldaLLave.error === false) {
      Alert.alert(
        'Información',
        `Se envió un código de seguridad al correo ${respuestaApiCeldaLLave.correo}, si este correo no es el tuyo, por favor comunicarse con administración`,
      );
      actualizarPaginaActual(+1);
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiCeldaLLave.errorMensaje,
      });
    }
  };

  const celdaAsignar = async () => {
    const respuestaApiCeldaLLave: RespuestaCeldaAsignar = await consultarApi(
      'api/celda/asignar',
      {
        codigoUsuario: usuario.codigo,
        codigoPanal: usuario.codigoPanal,
        celda,
        llave: codigoConfirmacion,
      },
    );

    console.log(respuestaApiCeldaLLave);

    if (respuestaApiCeldaLLave.error === false) {
      dispatch(
        actualizarUsuarioInformacion({
          celda: respuestaApiCeldaLLave.celda,
          codigoCelda: respuestaApiCeldaLLave.codigoCelda,
        }),
      );
      Alert.alert(
        'Éxito',
        'En hora buena, se ha conectado correctamente a su celda, ahora puede recibir notificaciones de vistas, entregas, reservas y pedir atenciones desde la aplicación.',
      );
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiCeldaLLave.errorMensaje,
      });
    }
  };

  return (
    <ScrollView>
      <Box padding={2}>
        <StepIndicator
          stepCount={2}
          customStyles={thirdIndicatorStyles}
          currentPosition={paginaActual}
          labels={['Celda', 'Código confirmación']}
        />
        {paginaActual === 0 ? (
          <Box>
            <Stack space={3}>
              <FormControl>
                <FormControl.Label
                  _text={{
                    color: 'coolGray.800',
                    fontSize: 'md',
                    fontWeight: 500,
                  }}>
                  Número de celda
                </FormControl.Label>
                <Input
                  type="text"
                  keyboardType="number-pad"
                  onChangeText={valor => setCelda(valor)}
                  autoCapitalize={'none'}
                />
                <FormControl.HelperText>
                  <Alertnb w="100%" status={'info'} borderWidth={1}>
                    <VStack space={2} flexShrink={1} w="100%">
                      <HStack
                        flexShrink={1}
                        space={2}
                        justifyContent="space-between">
                        <HStack space={2} flexShrink={1}>
                          <Text fontSize="lg" color="coolGray.800">
                            La celda es el número del apartamento, oficina,
                            casa, finca, residencia.
                          </Text>
                        </HStack>
                      </HStack>
                    </VStack>
                  </Alertnb>
                </FormControl.HelperText>
              </FormControl>
              <Box
                marginTop={2}
                borderColor={colores.gris}
                borderWidth="1"
                padding={2}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('PQRS', {
                      screen: 'preguntas',
                      initial: false,
                    })
                  }>
                  <Text fontSize={'lg'} color={colores.primary}>
                    No conoces o no tienes acceso al correo al cual se envió el
                    código, escribe una PQRS
                  </Text>
                </TouchableOpacity>
              </Box>
              <Box
                marginTop={2}
                borderColor={colores.gris}
                borderWidth="1"
                padding={2}
                alignItems={'center'}>
                <TouchableOpacity>
                  <Text fontSize={'lg'} color={colores.primary}>
                    Usar Qr
                  </Text>
                  <Ionicons
                    name={'qr-code-outline'}
                    size={60}
                    color={colores.primary}
                  />
                </TouchableOpacity>
              </Box>
              <Button isDisabled={celda === ''} onPress={() => celdaLLave()}>
                Siguiente
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box>
            <Stack space={3}>
              <FormControl>
                <FormControl.Label
                  _text={{
                    color: 'coolGray.800',
                    fontSize: 'md',
                    fontWeight: 500,
                  }}>
                  Código de confirmación
                </FormControl.Label>
                <Input
                  type="text"
                  keyboardType="number-pad"
                  onChangeText={valor => setCodigoConfirmacion(valor)}
                  autoCapitalize={'none'}
                />
              </FormControl>
              <Row justifyContent={'space-between'}>
                <Button onPress={() => actualizarPaginaActual(-1)}>
                  Anterior
                </Button>
                <Button
                  isDisabled={codigoConfirmacion === ''}
                  onPress={() => celdaAsignar()}>
                  Asignar
                </Button>
              </Row>
            </Stack>
          </Box>
        )}
      </Box>
    </ScrollView>
  );
}
