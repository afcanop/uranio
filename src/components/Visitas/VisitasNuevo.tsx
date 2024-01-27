import React, {useState} from 'react';
import Contenedor from 'common/Contenedor';
import {Button, FormControl, Input, VStack, useToast} from 'native-base';
import {consultarApi} from 'utils/api';
import {RespuestaVisitaNuevo} from 'interface/visita';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import ContenedorAnimado from 'common/ContendorAnimado';
import { ToastTituloError } from 'utils/const';

const VisitasNuevo = () => {
  const toast = useToast();
  const navigation = useNavigation();

  const [nombre, setNombre] = useState<string>('');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState<string>('');
  const [placa, setPlaca] = useState<string>('');
  const [mostrarAnimacionCargando, setMostrarAnimacionCargando] =
    useState<boolean>(false);
  const usuario = useSelector((state: RootState) => {
    return {
      celda: state.usuario.celdaCelda,
      codigoPanal: state.usuario.panalId,
    };
  }, shallowEqual);

  const guardarVisitas = async () => {
    try {
      setMostrarAnimacionCargando(true);
      if (nombre !== '') {
        const {respuesta, status} = await consultarApi<RespuestaVisitaNuevo>(
          'api/visita/nuevo',
          {
            celda: usuario.celda,
            codigoPanal: usuario.codigoPanal,
            numeroIdentificacion,
            nombre,
            placa,
          },
        );

        if (status === 200) {
          Alert.alert(
            'Correcto',
            `Su visita quedó registrada con el código: ${respuesta.codigoIngreso}`,
          );
          navigation.goBack();
        }
      } else {
        setMostrarAnimacionCargando(false);
        toast.show({
          title: 'Algo ha salido mal',
          description: 'El campos nombre son obligatorios',
        });
      }
    } catch (error: any) {
      setMostrarAnimacionCargando(false);
      toast.show({
        title: ToastTituloError,
        description: error.response.data.mensaje,
      });
    }
  };

  return (
    <Contenedor>
      <ContenedorAnimado>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label isRequired>Nombre</FormControl.Label>
            <Input
              value={nombre}
              onChangeText={(text: string) => setNombre(text)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Identificación</FormControl.Label>
            <Input
              value={numeroIdentificacion}
              onChangeText={(text: string) => setNumeroIdentificacion(text)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Placa</FormControl.Label>
            <Input
              value={placa}
              onChangeText={(text: string) => setPlaca(text)}
            />
          </FormControl>
          <Button
            mt="2"
            onPress={() => guardarVisitas()}
            isLoading={mostrarAnimacionCargando}
            isLoadingText="Cargando">
            Confirmar
          </Button>
        </VStack>
      </ContenedorAnimado>
    </Contenedor>
  );
};

export default VisitasNuevo;
