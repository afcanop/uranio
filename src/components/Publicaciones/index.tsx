import {useFocusEffect} from '@react-navigation/native';
import colores from 'assets/theme/colores';
import {Publicacion, respuestaPublicacionLista} from 'interface/publicacion';
import React, {useCallback, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {consultarApi} from 'utils/api';
import PublicacionesItem from './PublicacionesItem';
import {useToast} from 'native-base';

const Index = () => {
  const toast = useToast();
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [pagina, setPagina] = useState<number>(1);
  const usuario = useSelector((state: RootState) => {
    return {
      codigo: state.usuario.codigo,
    };
  });

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarPublicaciones();
      unsubscribe();
    }, []),
  );

  const consultarPublicaciones = async () => {
    const respuestaApiReservaDetalle: respuestaPublicacionLista =
      await consultarApi(
        `api/publicacion/lista/${usuario.codigo}/${pagina}`,
        null,
        {
          method: 'get',
          aplicarUrlBase: true,
        },
      );

    if (respuestaApiReservaDetalle.error === false) {
      setPublicaciones(publicaconesPrevias => [
        ...publicaconesPrevias,
        ...respuestaApiReservaDetalle.publicaciones,
      ]);
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiReservaDetalle.errorMensaje,
      });
    }
  };

  const cargarMasContanido = () => {
    setPagina(pagina + 1);
    consultarPublicaciones();
  };

  const renderFooter = () => {
    return cargando ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  return (
    <FlatList
      data={publicaciones}
      renderItem={({item}) => <PublicacionesItem item={item} />}
      keyExtractor={item => item.codigoPublicacionPk.toString()}
      onEndReached={cargarMasContanido}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
      style={{marginBottom: 50}}
    />
  );
};

export default Index;
