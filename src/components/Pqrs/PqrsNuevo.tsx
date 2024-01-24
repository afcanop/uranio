import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ContenedorAnimado from 'common/ContendorAnimado';
import Contenedor from 'common/Contenedor';
import {respuestaCasoNuevo} from 'interface/pqrs';
import {CasoTipo, respuestaCasoTipoLista} from 'interface/pqrsTipo';
import {
  Button,
  CheckIcon,
  FormControl,
  Select,
  TextArea,
  VStack,
  useToast,
} from 'native-base';
import React, {useCallback, useState} from 'react';
import { Keyboard } from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {consultarApi} from 'utils/api';

const PqrsNuevo = () => {
  const [pqrsTipo, setPqrsTipo] = useState<String>('');
  const [descripcion, setDescripcion] = useState<String>('');
  const [arrPqrsTipo, setArrPqrsTipo] = useState<CasoTipo[]>([]);
  const navigation = useNavigation();
  const toast = useToast();
  const usuarioCodigo = useSelector((state: RootState) => state.usuario.id);
  const [mostrarAnimacionCargando, setMostrarAnimacionCargando] =
    useState<boolean>(false);
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarPqrsTipo();
      unsubscribe();
    }, []),
  );

  const consultarPqrsTipo = async () => {
    const respuestaApiCasoLista: respuestaCasoTipoLista = await consultarApi(
      'api/casotipo/buscar',
      null,
    );

    if (respuestaApiCasoLista.error === false) {
      setArrPqrsTipo(respuestaApiCasoLista.casosTipos);
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiCasoLista.errorMensaje,
      });
    }
  };

  const guardarPqrs = async () => {
    setMostrarAnimacionCargando(true);
    Keyboard.dismiss();
    if (pqrsTipo !== '' && descripcion !== '') {
      const respuestaApiCasoNuevo: respuestaCasoNuevo = await consultarApi(
        'api/caso/nuevo',
        {
          codigoUsuario: usuarioCodigo,
          tipo: pqrsTipo,
          descripcion,
        },
      );

      if (respuestaApiCasoNuevo.error === false) {
        navigation.goBack();
        toast.show({
          title: 'Éxito',
          description: 'La PQRS registrada con éxito',
        });
      } else {
        setMostrarAnimacionCargando(true);
        toast.show({
          title: 'Algo ha salido mal',
          description: respuestaApiCasoNuevo.errorMensaje,
        });
      }
    } else {
      setMostrarAnimacionCargando(true);
      toast.show({
        title: 'Algo ha salido mal',
        description: 'Los campos tipo y descripción son obligatorios',
      });
    }
  };

  return (
    <Contenedor>
      <ContenedorAnimado>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label isRequired>Tipo</FormControl.Label>
            <Select
              accessibilityLabel="Seleccionar tipo"
              placeholder="Seleccionar tipo"
              _selectedItem={{
                bg: 'teal.600',
                color: 'white',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => {
                setPqrsTipo(itemValue);
              }}>
              {arrPqrsTipo.map((item: CasoTipo) => (
                <Select.Item
                  label={item.nombre}
                  value={item.codigoCasoTipoPk}
                />
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormControl.Label isRequired>Descripción</FormControl.Label>
            <TextArea
              h={20}
              placeholder="Comparte tus experiencias, preguntas o sugerencias con nosotros a través de nuestro sistema de PQRS."
              onChangeText={text => setDescripcion(text)}
              autoCompleteType={undefined}
            />
          </FormControl>
          <Button
            mt="2"
            onPress={() => guardarPqrs()}
            isLoading={mostrarAnimacionCargando}
            isLoadingText="Cargando">
            Confirmar
          </Button>
        </VStack>
      </ContenedorAnimado>
    </Contenedor>
  );
};

export default PqrsNuevo;
