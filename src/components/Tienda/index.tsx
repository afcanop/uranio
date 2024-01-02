import {FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {consultarApi} from 'utils/api';
import {AspectRatio, Box, Center, Image, Text, useToast} from 'native-base';
import {Linea, RespuestaLineaLista} from 'interface/linea';
import colores from 'assets/theme/colores';

const Index = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [arrLinea, setArrLinea] = useState<Linea[]>([]);
  const [recargarLista, setRecargarLista] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarLineas();
      unsubscribe();
    }, []),
  );

  const consultarLineas = async () => {
    const respuestaApiVisitaLista: RespuestaLineaLista = await consultarApi(
      'api/linea/lista',
      {
        linea: 'DES',
      },
    );
    if (respuestaApiVisitaLista.error === false) {
      if (recargarLista) {
        setRecargarLista(false);
      }
      setArrLinea(respuestaApiVisitaLista.lineas);
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiVisitaLista.errorMensaje,
      });
    }
  };

  return (
    <FlatList
      data={arrLinea}
      style={{marginBottom: 50}}
      renderItem={({item}) => (
        <Box width={'50%'} alignItems="center">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TiendaDetalle', {
                linea: item,
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
                    resizeMode="contain"
                  />
                </AspectRatio>
              </Box>
              <Center p="2">
                <Text
                  fontSize={'lg'}
                  fontWeight="black"
                  color={colores.primary}>
                  {item.nombre}
                </Text>
              </Center>
            </Box>
          </TouchableOpacity>
        </Box>
      )}
      numColumns={2}
      keyExtractor={item => `${item.codigoLineaPk}`}
      refreshControl={
        <RefreshControl
          colors={[colores.primary]}
          tintColor={colores.primary}
          refreshing={recargarLista}
          onRefresh={consultarLineas}
        />
      }
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Index;
