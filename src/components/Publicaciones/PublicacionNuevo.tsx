import {Text, PermissionsAndroid, Linking, StyleSheet} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  Box,
  Button,
  FormControl,
  HStack,
  Image,
  ScrollView,
  Switch,
  TextArea,
  VStack,
  useToast,
} from 'native-base';
import {Camera, CameraType} from 'react-native-camera-kit';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colores from 'assets/theme/colores';
import rnfs from 'react-native-fs';
import {consultarApi} from 'utils/api';
import {useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import Contenedor from 'common/Contenedor';
import {respuestaPublicacionNuevo} from 'interface/publicacion';

type ImageParams = {
  imagenBase64?: string;
  imagenNombre?: string;
};

const PublicacionNuevo = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const route = useRoute();
  const {
    imagenBase64: imagenGaleriaBase64 = '',
    imagenNombre: imagenGaleriaNombre = '',
  }: ImageParams = (route.params || {}) as ImageParams;
  const [imagenBase64, setImagenBase64] = useState<string | undefined>('');
  const [imagenNombre, setImagenNombre] = useState<string | undefined>('');
  const [comentario, setComentario] = useState<string>('');
  const [permiteComentario, setPermiteComentario] = useState<Boolean>(false);
  const [accesoCamara, setAccesoCamara] = useState<Boolean>(false);
  const [camaraTipo, setCamaraTipo] = useState<CameraType>(CameraType.Back);
  const camera = useRef(null);
  const codigoUsuario = useSelector((state: RootState) => state.usuario.codigo);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => {
        consultarPermisoCamara();
        setImagenBase64(imagenGaleriaBase64);
        setImagenNombre(imagenGaleriaNombre);
      };
      unsubscribe();
    }, [imagenGaleriaBase64, imagenGaleriaNombre]),
  );

  const consultarPermisoCamara = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Permisos de cámara para Veeci',
          message:
            'Veeci necesita acceso a tu cámara ' +
            'para que puedas tomar fotos increíbles.',
          buttonNeutral: 'Preguntar después',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Aceptar',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setAccesoCamara(true);
      } else {
        if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          // Si el usuario selecciona "Never Ask Again", guíalos a la configuración de la aplicación
          Linking.openSettings();
        } else {
          setAccesoCamara(false);
        }
        setAccesoCamara(false);
      }
    } catch (err) {
      setAccesoCamara(false);
    }
  };

  const cambiarTipoDeCamara = () => {
    setCamaraTipo(
      camaraTipo === CameraType.Back ? CameraType.Front : CameraType.Back,
    );
  };

  const tomarFoto = async () => {
    try {
      if (camera.current !== null) {
        const {uri, name} = await camera.current.capture();
        const fotoBase64 = await rnfs.readFile(uri, 'base64');
        setImagenBase64(fotoBase64);
        setImagenNombre(name);
      }
    } catch (error) {
      toast.show({
        title: 'Algo ha salido mal',
        description: 'Error al tomar la foto',
      });
    }
  };

  const guardarPublicacion = async () => {
    const respuestaApiPublicacionNuevo: respuestaPublicacionNuevo =
      await consultarApi('api/publicacion/nuevo/v1', {
        codigoUsuario,
        permiteComentario,
        comentario,
        imagenNombre,
        imagenBase64: `data:jpeg;base64,${imagenBase64}`,
      });
    if (respuestaApiPublicacionNuevo.error === false) {
      toast.show({
        title: 'Correcto',
        description: 'Publicación registrada',
      });
      navigation.goBack();
    } else {
      toast.show({
        title: 'Error',
        description: respuestaApiPublicacionNuevo.errorMensaje,
      });
    }
  };

  return (
    <>
      {accesoCamara ? (
        <>
          {imagenBase64 === '' ? (
            <Box flex={1}>
              <Camera
                ref={camera}
                cameraType={camaraTipo} // front/back(default)
                style={StyleSheet.absoluteFill}
                flashMode="auto"
              />
              <Box
                padding={2}
                flex={1}
                flexDirection={'row'}
                justifyContent={'space-between'}
                justifyItems={'center'}
                alignContent={'space-evenly'}
                alignItems={'flex-end'}>
                <TouchableOpacity
                  onPress={() => cambiarTipoDeCamara()}
                  style={styles.margenCamara}>
                  <Ionicons
                    name="camera-reverse-outline"
                    size={55}
                    color={colores.gris}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => tomarFoto()}
                  style={styles.btnCapturarImagen}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ModalGaleriaScreen', {
                      RutaAnterior: 'PublicacionNuevo',
                    });
                  }}
                  style={styles.margenCamara}>
                  <Ionicons
                    name="image-outline"
                    size={55}
                    color={colores.gris}
                  />
                </TouchableOpacity>
              </Box>
            </Box>
          ) : (
            <Contenedor>
              <ScrollView
                marginBottom={50}
                showsVerticalScrollIndicator={false}>
                <VStack space={3}>
                  <Image
                    source={{
                      uri: `data:image/jpeg;base64,${imagenBase64}`,
                    }}
                    alt="No presenta imagen de entrega"
                    height={'300px'}
                    width={'100%'}
                    resizeMode="stretch"
                  />
                  <Box style={{position: 'absolute', top: 10, right: 10}}>
                    <TouchableOpacity
                      onPress={() => {
                        setImagenBase64('');
                        setImagenBase64('');
                      }}>
                      <Ionicons
                        name="close-outline"
                        size={30}
                        color={colores.rojo['500']}
                      />
                    </TouchableOpacity>
                  </Box>
                  <FormControl>
                    <FormControl.Label isRequired>Comentario</FormControl.Label>
                    <TextArea
                      h={20}
                      onChangeText={text => setComentario(text)}
                      value={comentario}
                      autoCompleteType={undefined}
                    />
                  </FormControl>
                  <HStack alignItems="center" justifyContent={'space-between'}>
                    <Text>Desactivar Comentarios</Text>
                    <Switch
                      size="md"
                      onTrackColor={colores.base['50']}
                      onThumbColor={colores.primary}
                      offTrackColor="indigo.100"
                      offThumbColor="indigo.50"
                      onValueChange={() =>
                        setPermiteComentario(!permiteComentario)
                      }
                    />
                  </HStack>
                  <Button onPress={() => guardarPublicacion()}>Guardar</Button>
                </VStack>
              </ScrollView>
            </Contenedor>
          )}
        </>
      ) : (
        <Box flex={1} padding={2}>
          <VStack space={3} mt="5">
            <Text>
              Veeci no tiene permiso a la cámara del dispositivo, por favor
              intentar solicitar permiso.
            </Text>
            <Button onPress={() => consultarPermisoCamara()}>Ingresar</Button>
          </VStack>
        </Box>
      )}
    </>
  );
};

export default PublicacionNuevo;

const styles = StyleSheet.create({
  margenCamara: {
    marginBottom: 65,
  },
  btnCapturarImagen: {
    width: 60,
    height: 60,
    backgroundColor: 'red',
    borderRadius: 50,
    marginBottom: 65,
  },
});
