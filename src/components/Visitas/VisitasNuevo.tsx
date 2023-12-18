import React, {useState} from 'react';
import Contenedor from 'common/Contenedor';
import {Button, FormControl, Input, VStack, useToast} from 'native-base';
import {consultarApi} from 'utils/api';
import {RespuestaVisitaNuevo} from 'interface/visita';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

const VisitasNuevo = () => {
  const toast = useToast();
  const navigation = useNavigation();

  const [nombre, setNombre] = useState<string>('');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState<string>('');
  const [placa, setPlaca] = useState<string>('');
  const usuario = useSelector((state: RootState) => {
    return {
      codigoCelda: state.usuario.codigoCelda,
      codigoPanal: state.usuario.codigoPanal,
    };
  });

  const guardarVisitas = async () => {
    if (nombre !== '' && numeroIdentificacion !== '') {
      const respuestaApiVisitaNuevo: RespuestaVisitaNuevo = await consultarApi(
        'api/visita/nuevo',
        {
          codigoCelda: usuario.codigoCelda,
          codigoPanal: usuario.codigoPanal,
          numeroIdentificacion,
          nombre,
          placa,
        },
      );
      console.log(respuestaApiVisitaNuevo);

      if (respuestaApiVisitaNuevo.error === false) {
        Alert.alert(
          'Correcto',
          `Su visita quedó registrada con el código: ${respuestaApiVisitaNuevo.codigoIngreso}`,
        );
        navigation.goBack();
      } else {
        toast.show({
          title: 'Algo ha salido mal',
          description: respuestaApiVisitaNuevo.errorMensaje,
        });
      }
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description:
          'Los campos nombre y número identificación son obligatorios',
      });
    }
  };

  return (
    <Contenedor>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label isRequired>Nombre</FormControl.Label>
          <Input
            value={nombre}
            onChangeText={(text: string) => setNombre(text)}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label isRequired>Identificación</FormControl.Label>
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
        <Button mt="2" onPress={() => guardarVisitas()}>
          Confirmar
        </Button>
      </VStack>
    </Contenedor>
  );
};

export default VisitasNuevo;
