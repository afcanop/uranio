import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {consultarApi} from 'utils/api';
import {Heading, useToast} from 'native-base';
import {ProductoCategorizado, RespuestaItemLista} from 'interface/tienda';
import Contenedor from 'common/Contenedor';
import BuscarProductoItem from './BuscarProductoItem';
import {Linea} from 'interface/linea';

const TiendaDetalle = () => {
  const {linea}: Linea = useRoute().params;
  const toast = useToast();
  const [arrItems, setArrItems] = useState<ProductoCategorizado[]>([]);
  const [recargarLista, setRecargarLista] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarLineas();
      unsubscribe();
    }, []),
  );

  const consultarLineas = async () => {
    const respuestaApiItemsLista: RespuestaItemLista = await consultarApi(
      'api/item/lista',
      {
        linea: linea.codigoLineaPk,
        orden: null,
      },
    );

    if (respuestaApiItemsLista.error === false) {
      if (recargarLista) {
        setRecargarLista(false);
      }
      const items: any[] = [];
      for (const key in respuestaApiItemsLista.itemes) {
        if (respuestaApiItemsLista.itemes.hasOwnProperty(key)) {
          items.push(respuestaApiItemsLista.itemes[key]);
        }
      }
      setArrItems(items);
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiItemsLista.errorMensaje,
      });
    }
  };

  return (
    <FlatList
      data={arrItems}
      style={{marginBottom: 50}}
      renderItem={({item}) => (
        <Contenedor>
          <Heading>{item.nombre}</Heading>
          <>
            {item.itemes.map((subPr: any) => (
              <BuscarProductoItem item={subPr} />
            ))}
          </>
        </Contenedor>
      )}
      keyExtractor={item => `${item}`}
    />
  );
};

export default TiendaDetalle;

const styles = StyleSheet.create({});
