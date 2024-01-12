import {
  Platform,
  PermissionsAndroid,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
//import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Box, Image, Text} from 'native-base';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colores from 'assets/theme/colores';
import rnfs from 'react-native-fs';

const GaleriaScreen = () => {
  const navigation = useNavigation();
  const {RutaAnterior} = useRoute().params;
  const [photos, setPhotos] = useState<any[]>([]);
  const [fotoSeleccionada, setFotoSeleccionada] = useState<any>([]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarPermisoGaleria();
      unsubscribe();
    }, []),
  );

  const consultarPermisoGaleria = async () => {
    const getCheckPermissionPromise = () => {
      if (Platform.Version >= '33') {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();

    if (hasPermission) {
      return fetchPhotos();
    }
    const getRequestPermissionPromise = () => {
      if (Platform.Version >= '33') {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  };

  const fetchPhotos = useCallback(async () => {
    Alert("error consultando galeria");
    // const res = await CameraRoll.getPhotos({
    //   first: 20,
    //   assetType: 'Photos',
    // });
    // setPhotos(res?.edges);
  }, []);

  const seleccionarImagen = async (item: any) => {
    setFotoSeleccionada(item);
    const fotoBase64 = await rnfs.readFile(item?.node?.image?.uri, 'base64');
    // Dividir la URL en partes usando '/'
    let parts = item?.node?.image?.uri.split('/');

    // Encontrar la posición de "Pictures" en el array
    let indexPictures = parts.indexOf('Pictures');

    // Obtener el nombre del archivo que sigue después de "Pictures/"
    let nombreArchivo = parts[indexPictures + 1];

    navigation.navigate(RutaAnterior, {
      imagenBase64: fotoBase64,
      imagenNombre: nombreArchivo,
    });
    // Actualizar los parámetros con la nueva información
    // navigation.dispatch(
    //   CommonActions.setParams({
    //     imagenBase64: fotoBase64,
    //     imagenNombre: nombreArchivo,
    //   }),
    // );

    // // Si no hay datos, se establece un valor predeterminado
    // navigation.dispatch(CommonActions.goBack());
  };

  return (
    <FlatList
      data={photos}
      renderItem={({item}) => (
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            seleccionarImagen(item);
          }}>
          <Image
            source={{
              uri: item?.node?.image?.uri,
            }}
            alt="image"
            resizeMethod="auto"
            resizeMode="cover"
            style={[
              {width: '100%', height: 190},
              fotoSeleccionada.node?.image?.uri === item?.node?.image?.uri && {
                borderWidth: 5,
                borderColor: colores.verde['500'],
                opacity: 0.3,
              },
            ]}
          />
          {fotoSeleccionada.node?.image?.uri === item?.node?.image?.uri ? (
            <Box style={{position: 'absolute', top: 10, right: 10}}>
              <Ionicons
                name="checkmark-circle-outline"
                size={30}
                color={colores.verde['500']}
              />
            </Box>
          ) : null}
        </TouchableOpacity>
      )}
      numColumns={3}
      keyExtractor={item => `${item?.node?.image?.uri}`}
      style={{marginBottom: 50}}
    />
  );
};

export default GaleriaScreen;
