import React, {useCallback, useLayoutEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  Box,
  FlatList,
  HStack,
  Heading,
  Menu,
  Pressable,
  Stack,
  useToast,
  Text,
  AspectRatio,
  Image,
  Center,
  VStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colores from 'assets/theme/colores';
import {RefreshControl} from 'react-native-gesture-handler';
import {Oferta, respuestaOfertaLista} from 'interface/ofertas';
import {consultarApi} from 'utils/api';
import {useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Categoria, respuestaCategoriaLista} from 'interface/categoria';

const Index = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [arrOfertas, setArrOfertas] = useState<Oferta[]>([]);
  const [arrCategorias, setArrCategorias] = useState<Categoria[]>([]);
  const [recargarLista, setRecargarLista] = useState(false);
  const usuario = useSelector((state: RootState) => {
    return {
      codigoPanal: state.usuario.panalId,
    };
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <Menu
          // eslint-disable-next-line react/no-unstable-nested-components
          trigger={triggerProps => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                shouldOverlapWithTrigger={'Bottom Left'}
                {...triggerProps}>
                <Ionicons name="add-outline" size={25} color={colores.blanco} />
              </Pressable>
            );
          }}>
          <Menu.Item onPress={() => navigation.navigate('OfertaNuevo')}>
            <Ionicons name="add" size={20} color={colores.gris} />
            Nuevo
          </Menu.Item>
          <Menu.Item onPress={() => navigation.navigate('OfertaChat')}>
            <Ionicons
              name="chatbubbles-outline"
              size={20}
              color={colores.gris}
            />
            Mis chats
          </Menu.Item>
          <Menu.Item onPress={() => navigation.navigate('OfertaAnuncios')}>
            <Ionicons name="easel-outline" size={20} color={colores.gris} />
            Mis anuncionos
          </Menu.Item>
        </Menu>
      ),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => {
        consultarCategorias();
        consultarOfertas();
      };
      unsubscribe();
    }, []),
  );

  const consultarCategorias = async () => {
    const {respuesta, status} = await consultarApi<respuestaCategoriaLista>(
      'api/categoria/lista',
      null,
    );
    if (status === 200) {
      setArrCategorias(respuesta.categorias);
    }
  };

  const consultarOfertas = async () => {
    const {respuesta, status} = await consultarApi<respuestaOfertaLista>(
      'api/oferta/lista',
      {
        codigoPanal: 1,
      },
    );
    if (status === 200) {
      setArrOfertas(respuesta.ofertas);
    }
  };

  const renderCategoria = (item: Categoria) => (
    <Box
      m={2}
      p={2}
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      alignItems="center"
      key={item.codigoCatagoriaPk}>
      <Image
        source={{
          uri: item.urlImagen,
        }}
        w={38}
        h={38}
        alt=""
      />
      <Text>{item.nombre}</Text>
    </Box>
  );

  return (
    <>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {arrCategorias.map((item: Categoria) => renderCategoria(item))}
      </ScrollView>
      <FlatList
        data={arrOfertas}
        style={{marginBottom: 50}}
        renderItem={({item}) => (
          <Box width={'50%'} alignItems="center">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('OfertaDetalle', {
                  oferta: item,
                })
              }>
              <Box
                m={2}
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1">
                <Box>
                  <AspectRatio w="100%" ratio={17 / 10}>
                    <Image
                      source={{
                        uri: item.urlImagen,
                      }}
                      alt="image"
                    />
                  </AspectRatio>
                  <Center
                    bg={colores.primary}
                    position="absolute"
                    bottom="0"
                    px="3"
                    py="1.5">
                    <Text color="warmGray.50" fontWeight="700" fontSize="xs">
                      $ {item.precio}
                    </Text>
                  </Center>
                </Box>
                <Stack p="2" space={3}>
                  <Text fontWeight="400">{item.descripcion}</Text>
                </Stack>
              </Box>
            </TouchableOpacity>
          </Box>
        )}
        numColumns={2}
        keyExtractor={item => `${item.codigoOfertaPk}`}
        refreshControl={
          <RefreshControl
            colors={[colores.primary]}
            tintColor={colores.primary}
            refreshing={recargarLista}
            onRefresh={consultarOfertas}
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
                    Sin ofertas
                  </Heading>
                </HStack>
              </Stack>
            </Box>
          </Box>
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default Index;
