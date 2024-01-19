import React, {useCallback, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {useFocusEffect} from '@react-navigation/native';
import {consultarApi} from 'utils/api';
import {Contenido, RespuestaContenidoLista} from 'interface/documento';
import {
  Box,
  FlatList,
  HStack,
  VStack,
  Text,
  useToast,
  AlertDialog,
  Progress,
  Badge,
  Stack,
  Heading,
} from 'native-base';
import Contenedor from 'common/Contenedor';
import {Linking, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import rnfs from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {RefreshControl} from 'react-native-gesture-handler';
import ContenedorAnimado from 'common/ContendorAnimado';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import colores from 'assets/theme/colores';

const Documento = () => {
  const toast = useToast();
  const [arrDocumentos, setArrDocumentos] = useState<Contenido[]>([]);
  const [progreso, setProgreso] = useState<number>(0);
  const [nombreDocumento, setNombreDocumento] = useState('');
  const [abrirModal, setAbrirModal] = useState(false);
  const cerrarModal = () => setAbrirModal(false);
  const cancelRef = useRef(null);
  const [recargarLista, setRecargarLista] = useState(false);
  const width = useSharedValue(0);

  const usuarioCodigoPanal = useSelector(
    (state: RootState) => state.usuario.codigoPanal,
  );

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarContenidos();
      unsubscribe();
    }, []),
  );

  const consultarContenidos = async () => {
    const respuestaApiContenidoLista: RespuestaContenidoLista =
      await consultarApi('api/contenido/lista', {
        codigoPanal: usuarioCodigoPanal,
      });
    if (respuestaApiContenidoLista.error === false) {
      if (recargarLista) {
        setRecargarLista(false);
      }
      setArrDocumentos(respuestaApiContenidoLista.contenidos);
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiContenidoLista.errorMensaje,
      });
    }
  };

  const abrirURLDocumento = useCallback(async (url: string) => {
    // Checking if the link is supported for links with a custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app; if the URL scheme is "http," the web link should be opened
      // by some browser on the mobile device
      await Linking.openURL(url);
    } else {
      await Linking.openURL(url);
    }
  }, []);

  const descargarDocumento = async (url: string, nombreArchivo: string) => {
    setNombreDocumento(nombreArchivo);
    setAbrirModal(true);
    width.value = width.value - 100;
    const filePath = rnfs.DocumentDirectoryPath + `/${nombreArchivo}`;
    if (await rnfs.exists(filePath)) {
      setProgreso(100);
    } else {
      rnfs
        .downloadFile({
          fromUrl: url,
          toFile: filePath,
          background: true, // Enable downloading in the background (iOS only)
          discretionary: true, // Allow the OS to control the timing and speed (iOS only)
          progress: res => {
            // Handle download progress updates if needed
            const progress = (res.bytesWritten / res.contentLength) * 100;
            console.log(progress);
            width.value = parseInt(progress.toFixed(0), 10);
          },
        })
        .promise.then(async () => {
          setProgreso(100);
          width.value = 100;
          await rnfs.writeFile(filePath, 'Lorem ipsum dolor sit amet', 'utf8');
        })
        .catch(err => {
          console.log('Download error:', err);
        });
    }
  };

  const abrirDocumentoDescargado = () => {
    const filePath = rnfs.DocumentDirectoryPath + `/${nombreDocumento}`;
    if (filePath) {
      FileViewer.open(filePath)
        .then(() => {
          cerrarModal();
        })
        .catch(_err => {
          console.log(_err);
        });
    } else {
      console.log('El archivo aún no ha sido descargado.');
    }
  };

  return (
    <Contenedor>
      <FlatList
        data={arrDocumentos}
        renderItem={({item, index}) => (
          <ContenedorAnimado delay={50 * index}>
            <Box
              padding={2}
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              justifyContent={'space-between'}>
              <HStack>
                <VStack space={2} flex={1}>
                  <Text>{item.nombre}</Text>
                </VStack>
                <HStack
                  flexDirection={'row-reverse'}
                  space={4}
                  flex={1}
                  alignContent={'flex-end'}>
                  <TouchableOpacity
                    onPress={() =>
                      descargarDocumento(item.url, item.nombreArchivo)
                    }>
                    <Ionicons
                      name={'download-outline'}
                      size={50}
                      color={'coolGray.800'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => abrirURLDocumento(item.url)}>
                    <Ionicons
                      name={'eye-outline'}
                      size={50}
                      color={'coolGray.800'}
                    />
                  </TouchableOpacity>
                </HStack>
              </HStack>
            </Box>
          </ContenedorAnimado>
        )}
        keyExtractor={item => `${item.codigoContenidoPk}`}
        refreshControl={
          <RefreshControl
            refreshing={recargarLista}
            onRefresh={consultarContenidos}
          />
        }
        ListEmptyComponent={
          <Box
            margin={2}
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1">
            <Box>
              <Stack p="4" space={3}>
                <HStack space={2} justifyContent={'space-between'}>
                  <Heading size="md" ml="-1">
                    Sin documentos
                  </Heading>
                </HStack>
              </Stack>
            </Box>
          </Box>
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={abrirModal}
        onClose={cerrarModal}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Descargar documento</AlertDialog.Header>
          <AlertDialog.Body>
            {progreso === 100 ? (
              <>
                <Text fontSize={'lg'} fontWeight={'bold'}>
                  Descarga completa
                </Text>
                <TouchableOpacity onPress={() => abrirDocumentoDescargado()}>
                  <Text mt={2} underline>
                    Abrir Documento {nombreDocumento}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Animated.View
                  style={{
                    width,
                    height: 10,
                    backgroundColor: colores.primary,
                    borderRadius: 10 / 2,
                  }}
                />
              </>
            )}
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>
    </Contenedor>
  );
};

export default Documento;
