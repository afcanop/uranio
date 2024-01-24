import {Text, PermissionsAndroid, Linking, StyleSheet} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Box, Button, VStack, useToast} from 'native-base';
import {Camera, CameraType} from 'react-native-camera-kit';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colores from 'assets/theme/colores';
import rnfs from 'react-native-fs';
import {consultarApi} from 'utils/api';
import {actualizarUsuarioInformacion} from 'store/reducers/usuarioReducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {RespuestaUsuarioCambioImagen} from 'interface/usuario';

const CambioImagen = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigation = useNavigation();
  const [accesoCamara, setAccesoCamara] = useState<Boolean>(false);
  const [camaraTipo, setCamaraTipo] = useState<CameraType>(CameraType.Back);
  const camera = useRef(null);
  const codigoUsuario = useSelector((state: RootState) => state.usuario.id);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarPermisoCamara();
      unsubscribe();
    }, []),
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
        const {uri} = await camera.current.capture();
        const base64 = await rnfs.readFile(uri, 'base64');
        enviarNuevaFoto(base64);
      }
    } catch (error) {
      toast.show({
        title: 'Algo ha salido mal',
        description: 'Error al tomar la foto',
      });
    }
  };

  const enviarNuevaFoto = async (base64: string) => {
    const respuestaApiCambiarImagen: RespuestaUsuarioCambioImagen =
      await consultarApi('api/usuario/cambiarimagen', {
        codigoUsuario,
        imagenBase64: `data:jpeg;base64,${base64}`,
      });
    if (respuestaApiCambiarImagen.error === false) {
      dispatch(
        actualizarUsuarioInformacion({
          urlImagen: respuestaApiCambiarImagen.urlImagen,
        }),
      );
      toast.show({
        title: 'Correcto',
        description: 'Cambios de imagen exitoso',
      });
    } else {
      toast.show({
        title: 'Error',
        description: respuestaApiCambiarImagen.errorMensaje,
      });
    }
  };

  return (
    <>
      {accesoCamara ? (
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
              onPress={() => navigation.goBack()}
              style={styles.margenCamara}>
              <Ionicons name="close-outline" size={55} color={colores.gris} />
            </TouchableOpacity>
          </Box>
        </Box>
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

export default CambioImagen;

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
