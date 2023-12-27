import React, {useCallback, useRef, useState} from 'react';
import {
  Box,
  Button,
  Center,
  FlatList,
  FormControl,
  HStack,
  Heading,
  Image,
  Input,
  Text,
  TextArea,
  VStack,
  useToast,
} from 'native-base';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  Categoria,
  respuestaCategoriaLista,
  respuestaCategoriaNuevo,
} from 'interface/categoria';
import {consultarApi} from 'utils/api';
import {
  Alert,
  ImageBackground,
  Linking,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Contenedor from 'common/Contenedor';
import colores from 'assets/theme/colores';
import Ionicons from 'react-native-vector-icons/Ionicons';
import rnfs from 'react-native-fs';
import {Camera, CameraScreen, CameraType} from 'react-native-camera-kit';
import MensajeSinPermisoCamara from 'common/MensajeSinPermisoCamara';
import {useSelector} from 'react-redux';
import {RootState} from 'store/reducers';

const OfertasNuevo = () => {
  const toast = useToast();
  const camera = useRef(null);
  const navigation = useNavigation();
  const [capturarImagen, setCapturarImagen] = useState<Boolean>(false);
  const [accesoCamara, setAccesoCamara] = useState<Boolean>(false);
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [imageBase64, setImageBase64] = useState<string>(''); // Estado que contiene la cadena base64 de la imagen
  const [categorias, setCategoria] = useState<Categoria | null>(null);
  const [arrCategorias, setArrCategorias] = useState<Categoria[]>([]);
  const usuario = useSelector((state: RootState) => {
    return {
      codigoPanal: state.usuario.codigoPanal,
      codigo: state.usuario.codigo,
    };
  });

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => {
        consultarCategorias();
        consultarPermisoCamara();
      };
      unsubscribe();
    }, []),
  );

  const consultarCategorias = async () => {
    const respuestaApiCategoriaLista: respuestaCategoriaLista =
      await consultarApi('api/categoria/lista', null);
    if (respuestaApiCategoriaLista.error === false) {
      setArrCategorias(respuestaApiCategoriaLista.categorias);
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiCategoriaLista.errorMensaje,
      });
    }
  };

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
          //Linking.openSettings();
        } else {
          setAccesoCamara(false);
        }
        setAccesoCamara(false);
      }
    } catch (err) {
      setAccesoCamara(false);
    }
  };

  const tomarFoto = async () => {
    // try {
    //   if (camera.current !== null) {
    //     const {uri} = await camera.current?.capture();
    //     console.log(await camera.current.capture());
    //     // const {uri} = await camera.current.capture();
    //     // const base64 = await rnfs.readFile(uri, 'base64');
    //     // console.log(base64);
    //     // setImageBase64(base64);
    //     setCapturarImagen(false);
    //   }
    // } catch (error) {
    //   toast.show({
    //     title: 'Algo ha salido mal',
    //     description: 'Error al tomar la foto',
    //   });
    // }
  };

  const guardarOferta = async () => {
    const respuestaApiOfertaNuevo: respuestaCategoriaNuevo = await consultarApi(
      'api/oferta/nuevo',
      {
        codigoPanal: usuario.codigoPanal,
        codigoUsuario: usuario.codigo,
        categoria: categorias?.codigoCatagoriaPk,
        descripcion,
        precio,
      },
    );
    console.log(respuestaApiOfertaNuevo);

    if (respuestaApiOfertaNuevo.error === false) {
      Alert.alert('Exito', 'Se registro su oferta');
      navigation.goBack();
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiOfertaNuevo.errorMensaje,
      });
    }
  };

  const camaraOfertaNuevo = () => (
    <Box flex={1}>
      <Camera ref={camera} style={StyleSheet.absoluteFill} flashMode="auto" />
      <Box
        padding={2}
        flex={1}
        flexDirection={'row'}
        justifyContent={'center'}
        justifyItems={'center'}
        alignItems={'flex-end'}>
        <Box flex={1.5} alignItems={'flex-end'}>
          <TouchableOpacity
            onPress={() => tomarFoto()}
            style={styles.btnCapturarImagen}
          />
        </Box>
        <Box flex={1}>
          <TouchableOpacity
            onPress={() => setCapturarImagen(false)}
            style={styles.margenCamara}>
            <Ionicons name="close-outline" size={55} color={colores.gris} />
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );

  const formularioOfertaNuevo = () => (
    <Contenedor>
      <VStack space={3} mt="5">
        <HStack justifyContent={'space-between'}>
          <Text fontSize={'3xl'} fontWeight={'bold'} color={colores.primary}>
            {categorias?.nombre}
          </Text>
          <TouchableOpacity onPress={() => setCategoria(null)}>
            <Ionicons
              name="close-outline"
              size={50}
              color={colores.rojo['500']}
            />
          </TouchableOpacity>
        </HStack>
        <FormControl>
          <FormControl.Label isRequired>Precio</FormControl.Label>
          <Input
            type={'text'}
            keyboardType="numeric"
            onChangeText={(valor: string) => setPrecio(valor)}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label isRequired>Descripción</FormControl.Label>
          <TextArea
            h={20}
            onChangeText={text => setDescripcion(text)}
            value={descripcion}
            autoCompleteType={undefined}
          />
        </FormControl>
        <HStack justifyContent={'space-between'}>
          <Text>Agregar Foto *</Text>
          <TouchableOpacity onPress={() => setCapturarImagen(true)}>
            <Ionicons name="camera-outline" size={30} color={colores.primary} />
          </TouchableOpacity>
        </HStack>
        <ImageBackground
          source={{uri: `data:image/jpeg;base64,${imageBase64}`}}
          style={styles.backgroundImage}>
          <Ionicons
            name="close-outline"
            size={30}
            color={colores.rojo['500']}
          />
        </ImageBackground>
        <Button mt="2" onPress={() => guardarOferta()}>
          Confirmar
        </Button>
      </VStack>
    </Contenedor>
  );

  const listaCategorias = () => (
    <FlatList
      data={arrCategorias}
      ListHeaderComponent={
        <Heading mx={1} mt={1}>
          Seleccionar categoría
        </Heading>
      }
      renderItem={({item}) => (
        <Box
          m={1}
          p={2}
          width={'48%'}
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          alignItems="center"
          key={item.codigoCatagoriaPk}>
          <TouchableOpacity onPress={() => setCategoria(item)}>
            <Center>
              <Image
                source={{
                  uri: item.urlImagen,
                }}
                w={35}
                h={35}
                alt=""
              />
              <Text fontSize={'sm'}>{item.nombre}</Text>
            </Center>
          </TouchableOpacity>
        </Box>
      )}
      numColumns={2}
      keyExtractor={item => `${item.codigoCatagoriaPk}`}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );

  const renderContent = () => {
    if (categorias) {
      return capturarImagen ? camaraOfertaNuevo() : formularioOfertaNuevo();
    } else {
      return listaCategorias();
    }
  };

  return <>{renderContent()}</>;
};

export default OfertasNuevo;

const styles = StyleSheet.create({
  margenCamara: {
    marginBottom: 65,
    alignItems: 'flex-end',
  },
  btnCapturarImagen: {
    width: 60,
    height: 60,
    backgroundColor: 'red',
    borderRadius: 50,
    marginBottom: 65,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Puedes ajustar el modo de redimensionamiento según tus necesidades
    justifyContent: 'center',
  },
});
