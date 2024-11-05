import {useNavigation} from '@react-navigation/native';
import colores from 'assets/theme/colores';
import {RespuestaCeldaAsignar, RespuestaCeldaLLave} from 'interface/celda';
import {
  Box,
  Button,
  FormControl,
  Input,
  Row,
  Stack,
  Text,
  VStack,
  useToast,
  Alert as Alertnb,
  HStack,
} from 'native-base';
import React, {useState} from 'react';
import {Alert, ScrollView, TouchableOpacity} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {StepIndicatorStyles} from 'react-native-step-indicator/lib/typescript/src/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {actualizarUsuarioInformacion} from 'store/reducers/usuarioReducer';
import {consultarApi} from 'utils/api';
import {ToastTituloError} from 'utils/const';

const thirdIndicatorStyles: StepIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 20,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: colores.primary,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: colores.verde['500'],
  stepStrokeUnFinishedColor: colores.gris,
  separatorFinishedColor: colores.gris,
  separatorUnFinishedColor: colores.gris,
  stepIndicatorFinishedColor: colores.verde['100'],
  stepIndicatorUnFinishedColor: colores.gris,
  stepIndicatorCurrentColor: colores.blanco,
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: colores.gris,
  labelSize: 13,
  currentStepLabelColor: colores.gris,
};

const ConectarCelda = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [paginaActual, setPaginaActual] = useState<number>(1);
  const [celda, setCelda] = useState<string>('');

  const [codigoConfirmacion, setCodigoConfirmacion] = useState<string>('');
  const actualizarPaginaActual = (numero: number) => {
    setPaginaActual(paginaActual + numero);
  };
  const usuario = useSelector((state: RootState) => {
    return {
      codigo: state.usuario.id,
      panalNombre: state.usuario.panalNombre,
      codigoPanal: state.usuario.panalId,
    };
  }, shallowEqual);

  const celdaLLave = async () => {
    try {
      const {status, respuesta} = await consultarApi<RespuestaCeldaLLave>(
        'api/celda/llave',
        {
          codigoUsuario: usuario.codigo,
          codigoPanal: usuario.codigoPanal,
          celda,
        },
      );
      if (status === 200) {
        Alert.alert(
          'Información',
          `Se envió un código de seguridad al correo ${respuesta.correo}, si este correo no es el tuyo, por favor comunicarse con administración`,
        );
        actualizarPaginaActual(+1);
      }
    } catch (error: any) {
      toast.show({
        title: ToastTituloError,
        description: error.response.data.mensaje,
      });
    }
  };

  const celdaAsignar = async () => {
    try {
      const {status, respuesta} = await consultarApi<RespuestaCeldaAsignar>(
        'api/celda/vincular',
        {
          codigoUsuario: usuario.codigo,
          codigoPanal: usuario.codigoPanal,
          celda,
          llave: codigoConfirmacion,
        },
      );
      if (status === 200) {
        dispatch(
          actualizarUsuarioInformacion({
            celda: respuesta.celda,
            celdaId: respuesta.codigoCelda,
          }),
        );
        Alert.alert(
          'Éxito',
          'En hora buena, se ha conectado correctamente a su celda, ahora puede recibir notificaciones de vistas, entregas, reservas y pedir atenciones desde la aplicación.',
        );
      }
    } catch (error: any) {
      toast.show({
        title: ToastTituloError,
        description: error.response.data.mensaje,
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
                  value={celda}
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
                  value={codigoConfirmacion}
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
};

export default ConectarCelda;
