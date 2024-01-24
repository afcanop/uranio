import React, {useCallback, useState} from 'react';
import Contenedor from 'common/Contenedor';
import {
  Avatar,
  Box,
  Divider,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  useToast,
} from 'native-base';
import colores from 'assets/theme/colores';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FlatList, TouchableOpacity} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {consultarApi} from 'utils/api';
import {
  Comentario,
  RespuestaComentarioLista,
  RespuestaComentarioNuevo,
} from 'interface/comentario';
import {RefreshControl} from 'react-native-gesture-handler';
import TextoFecha from 'common/TextoFecha';

const PublicacionesComentarios = () => {
  const {codigoPublicacionPk}: {codigoPublicacionPk: number} =
    useRoute().params;
  const toast = useToast();
  const usuario = useSelector((state: RootState) => {
    return {
      codigo: state.usuario.id,
      imagen: state.usuario.urlImagen,
    };
  }, shallowEqual);

  const [arrComentarios, setArrCamentarios] = useState<Comentario[]>([]);
  const [recargarLista, setRecargarLista] = useState<boolean>(false);
  const [comentario, setComentario] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarComentarios();
      unsubscribe();
    }, []),
  );

  const consultarComentarios = async () => {
    const respuestaApiComentarioLista: RespuestaComentarioLista =
      await consultarApi('api/comentario/lista', {
        codigoPublicacion: codigoPublicacionPk,
      });
    if (respuestaApiComentarioLista.error === false) {
      setArrCamentarios(respuestaApiComentarioLista.comentarios);
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiComentarioLista.errorMensaje,
      });
    }
  };

  const guardarComentario = async () => {
    const respuestaApiComentarioLista: RespuestaComentarioNuevo =
      await consultarApi('api/comentario/nuevo', {
        codigoUsuario: usuario.codigo,
        codigoPublicacion: codigoPublicacionPk,
        comentario,
      });
    if (respuestaApiComentarioLista.error === false) {
      consultarComentarios();
      setComentario('');
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiComentarioLista.errorMensaje,
      });
    }
  };

  return (
    <Contenedor>
      <Box flex={1}>
        <FlatList
          data={arrComentarios}
          renderItem={({item}: {item: Comentario}) => (
            <VStack
              mb={5}
              //padding={2}
              //rounded="lg"
              //overflow="hidden"
              //borderColor="coolGray.200"
              //borderWidth="1"
              space={2}
              flexDirection={'row'}>
              <Avatar
                bg={colores.primary}
                size="md"
                source={{
                  uri: item.usuarioUrlImagen,
                }}
              />
              <VStack flex={1} space={1} ml={2}>
                <Text>{item.usuarioNombre}</Text>
                <Text>{item.comentario}</Text>
                <TextoFecha fecha={item.fecha} />
              </VStack>
            </VStack>
          )}
          refreshControl={
            <RefreshControl
              refreshing={recargarLista}
              onRefresh={consultarComentarios}
            />
          }
          keyExtractor={item => `${item.codigoComentarioPk}`}
          showsVerticalScrollIndicator={false}
        />
      </Box>
      <Box style={{marginBottom: 50}}>
        <Divider mb={2} />
        <HStack
          space={2}
          justifyItems={'center'}
          justifyContent={'space-between'}
          alignContent={'space-between'}>
          <Avatar
            bg={colores.primary}
            alignSelf="center"
            size="md"
            source={{
              uri: usuario.imagen,
            }}
          />
          <Input
            type={'text'}
            flex={1}
            value={comentario}
            placeholder="Agrega un comentario..."
            onChangeText={valor => setComentario(valor)}
            multiline={true}
            InputRightElement={
              <>
                {comentario !== '' ? (
                  <TouchableOpacity
                    onPress={() => guardarComentario()}
                    style={{marginHorizontal: 5}}>
                    <Ionicons
                      name={'send-outline'}
                      size={25}
                      color={colores.verde['500']}
                    />
                  </TouchableOpacity>
                ) : null}
              </>
            }
          />
        </HStack>
      </Box>
    </Contenedor>
  );
};

export default PublicacionesComentarios;
