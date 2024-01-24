import {Keyboard, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Contenedor from 'common/Contenedor';
import {
  Box,
  Button,
  FormControl,
  Heading,
  Text,
  TextArea,
  VStack,
  useToast,
} from 'native-base';
import {PublicacionTipoReposte} from 'utils/const';
import {consultarApi} from 'utils/api';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {useRoute} from '@react-navigation/native';

const PublicacionesReporte = () => {
  const toast = useToast();
  const [tipoReporte, setTipoReporte] = useState<string>('');
  const [comentario, setComentario] = useState<string>('');
  const {codigoPublicacionPk}: {codigoPublicacionPk: number} =
    useRoute().params;
  const usuario = useSelector((state: RootState) => {
    return {
      codigo: state.usuario.id,
    };
  }, shallowEqual);

  const enviarReporte = async () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    const respuestaApiReservaLista = await consultarApi(
      'api/publicacion/reporte',
      {
        codigoUsuario: usuario.codigo,
        codigoPublicacion: codigoPublicacionPk,
        tipoReporte,
        comentario,
      },
    );
    if (respuestaApiReservaLista.error === false) {
      //setArrReservas(respuestaApiReservaLista.reservas);
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiReservaLista.errorMensaje,
      });
    }
  };

  return (
    <Contenedor>
      <Box
        padding={2}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1">
        <Heading fontSize={'lg'}>¿Cuál es el problema?</Heading>
        {tipoReporte !== '' ? (
          <>
            <Heading fontSize={'sm'}>
              Reportar publicación por {tipoReporte}
            </Heading>
            <FormControl>
              <FormControl.Label>Comentario</FormControl.Label>
              <TextArea
                h={20}
                onChangeText={text => setComentario(text)}
                placeholder={`Ejemplo: la publicación no es apta para que sea publicada ya que contiene ${tipoReporte}`}
                value={comentario}
                autoCompleteType={undefined}
              />
            </FormControl>
            <Button mt={2} onPress={() => enviarReporte()}>
              Reportar
            </Button>
          </>
        ) : (
          <>
            <Heading fontSize={'sm'}>Selecciona un problema</Heading>
            <VStack space={3} mt={4}>
              <>
                {PublicacionTipoReposte.map((nombre: string) => (
                  <TouchableOpacity
                    key={nombre}
                    onPress={() => setTipoReporte(nombre)}>
                    <Text>{nombre}</Text>
                  </TouchableOpacity>
                ))}
              </>
            </VStack>
          </>
        )}
      </Box>
    </Contenedor>
  );
};

export default PublicacionesReporte;
