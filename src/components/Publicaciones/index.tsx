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
  AspectRatio,
  Image,
  Center,
  Heading,
  HStack,
  Avatar,
} from 'native-base';
import React, {useRef, useState} from 'react';
import {
  Alert,
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {red} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
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
  const [megusta, setMegusta] = useState<boolean>(false);
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
  const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // Animación de pulso
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
    setMegusta(!megusta);
  };

  const animatedStyle = {
    transform: [{scale: scaleValue}],
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
      <Box
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}>
        <Box>
          <HStack
            p={2}
            justifyContent={'space-between'}
            alignItems={'center'}
            justifyItems={'center'}>
            <HStack space={2} alignItems={'center'}>
              <Avatar
                bg="cyan.500"
                alignSelf="center"
                size="md"
                source={{
                  uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                }}>
                HS
              </Avatar>
              <Text>nombre</Text>
            </HStack>

            <TouchableOpacity>
              <Ionicons
                name={'ellipsis-vertical'}
                size={32}
                color={colores.primary}
              />
            </TouchableOpacity>
          </HStack>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack p="2" space={3}>
          <HStack space={2}>
            <TouchableWithoutFeedback onPress={handlePress}>
              <AnimatedIonicons
                name={megusta ? 'heart-outline' : 'heart'}
                size={25}
                color={megusta ? colores.primary : colores.rojo['500']}
                style={animatedStyle}
              />
            </TouchableWithoutFeedback>
            <TouchableOpacity>
              <Ionicons
                name={'chatbox-outline'}
                size={25}
                color={colores.primary}
              />
            </TouchableOpacity>
          </HStack>
          <Text fontWeight="400">
            Bengaluru (also called Bangalore) is the center of India's high-tech
            industry. The city is also known for its parks and nightlife.
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
                fontWeight="400">
                6 mins ago
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </ScrollView>
  );
}
