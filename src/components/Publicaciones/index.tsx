/* eslint-disable react/no-unstable-nested-components */
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import colores from 'assets/theme/colores';
import {Publicacion, respuestaPublicacionLista} from 'interface/publicacion';
import React, {useCallback, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {consultarApi} from 'utils/api';
import PublicacionesItem from './PublicacionesItem';
import {Actionsheet, Heading, useDisclose, useToast} from 'native-base';
import ConectarCelda from 'components/ConectarCelda/ConectarCelda';
import uuid from 'react-native-uuid';
import {RefreshControl} from 'react-native-gesture-handler';

type Params = {
  nuevaPublicacion: boolean;
};

const Index = () => {
  const toast = useToast();
  const {isOpen, onOpen, onClose} = useDisclose();
  const navigation = useNavigation();
  const {nuevaPublicacion}: Params = (useRoute().params ?? {
    consultarPagina: false,
  }) as Params;

  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [cargando] = useState<boolean>(false);
  const [pagina, setPagina] = useState<number>(1);
  const [codigoPublicacionPk, setCodigoPublicacionPk] = useState<number>(0);
  const usuario = useSelector((state: RootState) => {
    return {
      codigo: state.usuario.codigo,
      codigoCelda: state.usuario.codigoCelda,
    };
  }, shallowEqual);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => {
        consultarPublicaciones();
      };
      unsubscribe();
    }, []),
  );

  const consultarPublicaciones = async () => {

    //Organizar paginación, no regarga la lista cuando se se crea una nueva publicacion

    const respuestaApiPublicacionLista: respuestaPublicacionLista =
      await consultarApi(
        `api/publicacion/lista/${usuario.codigo}/${pagina}`,
        null,
        {
          method: 'get',
          aplicarUrlBase: true,
        },
      );

    if (respuestaApiPublicacionLista.error === false) {
      if (respuestaApiPublicacionLista.publicaciones.length > 0) {
        if (pagina === 1) {
          setPublicaciones(respuestaApiPublicacionLista.publicaciones);
          setPagina(pagina + 1);
        } else {
          setPublicaciones(publicaconesPrevias => [
            ...publicaconesPrevias,
            ...respuestaApiPublicacionLista.publicaciones,
          ]);
          setPagina(pagina + 1);
        }
      }
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiPublicacionLista.errorMensaje,
      });
    }
  };

  const cargarMasContanido = () => {
    consultarPublicaciones();
  };

  const renderFooter = () => {
    return cargando ? (
      <ActivityIndicator size="large" color={colores.primary} />
    ) : null;
  };

  const acciones = (codigoPublicacionPk: number) => {
    onOpen();
    setCodigoPublicacionPk(codigoPublicacionPk);
  };

  const reportarPublicacion = () => {
    onClose();
    navigation.navigate('PublicacionesReporte', {
      codigoPublicacionPk: codigoPublicacionPk.toString(),
    });
  };

  const regresacarPublicaciones = () => {
    setPagina(1);
    consultarPublicaciones();
  };

  const PublicacionesLista = () => (
    <>
      <Heading>{pagina}</Heading>
      <FlatList
        data={publicaciones}
        renderItem={({item}) => (
          <PublicacionesItem
            item={item}
            acciones={codigoPublicacionPk => acciones(codigoPublicacionPk)}
          />
        )}
        keyExtractor={() => `${uuid.v4()}`}
        onEndReached={cargarMasContanido}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        style={{marginBottom: 50}}
        refreshControl={
          <RefreshControl
            refreshing={cargando}
            onRefresh={regresacarPublicaciones}
          />
        }
      />
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={() => reportarPublicacion()}>
            Reportar publicación
          </Actionsheet.Item>
          <Actionsheet.Item
            _text={{
              color: colores.rojo['500'],
            }}>
            Bloquear usuario
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );

  return (
    <>
      {usuario.codigoCelda === null ? (
        <ConectarCelda />
      ) : (
        <PublicacionesLista />
      )}
    </>
  );
};

export default Index;
