/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import colores from 'assets/theme/colores';
import {Publicacion, RespuestaPublicacionLista} from 'interface/publicacion';
import React, {useCallback, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {consultarApi} from 'utils/api';
import PublicacionesItem from './PublicacionesItem';
import {Actionsheet, useDisclose, useToast} from 'native-base';
import ConectarCelda from 'components/ConectarCelda/ConectarCelda';
import {RefreshControl} from 'react-native-gesture-handler';
import {ToastTituloError} from 'utils/const';

const Index = () => {
  const toast = useToast();
  const {isOpen, onOpen, onClose} = useDisclose();
  const navigation = useNavigation();
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [cargando] = useState<boolean>(false);
  const [pagina, setPagina] = useState<number>(1);
  const [codigoPublicacionPk, setCodigoPublicacionPk] = useState<number>(0);
  const usuario = useSelector((state: RootState) => {
    return {
      codigo: state.usuario.id,
      codigoCelda: state.usuario.celdaId,
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

  const consultarPublicacionesPaginaUno = () => {
    setPagina(1);
    consultarPublicaciones();
  };

  const cargarMasContanido = () => {
    setPagina(pagina + 1);
    consultarPublicaciones();
  };

  const consultarPublicaciones = async () => {
    try {
      const {status, respuesta} = await consultarApi<RespuestaPublicacionLista>(
        `api/publicacion/lista/${usuario.codigo}/${pagina}`,
        null,
        {
          method: 'get',
        },
      );
      if (status === 200) {
        if (respuesta.publicaciones.length > 0) {
          if (pagina === 1) {
            setPublicaciones(respuesta.publicaciones);
          } else {
            setPublicaciones(prevPublicaciones => [
              ...prevPublicaciones,
              ...respuesta.publicaciones,
            ]);
          }
        }
      }
    } catch (error: any) {
      toast.show({
        title: ToastTituloError,
        description: error.response.data.mensaje,
      });
    }
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

  const PublicacionesLista = () => (
    <>
      <FlatList
        data={publicaciones}
        renderItem={({item}) => (
          <PublicacionesItem
            item={item}
            acciones={codigoPublicacionPk => acciones(codigoPublicacionPk)}
          />
        )}
        //keyExtractor={() => `${uuid.v4()}`}
        //keyExtractor={(item, index) => index.toString()} // Utilizar el índice como clave
        onEndReached={cargarMasContanido}
        onEndReachedThreshold={0.8}
        ListFooterComponent={renderFooter}
        style={{marginBottom: 50}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={cargando}
            onRefresh={consultarPublicacionesPaginaUno}
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
