import React, {useState} from 'react';
import Contenedor from 'common/Contenedor';
import {Button, FormControl, TextArea, VStack, useToast} from 'native-base';
import {consultarApi} from 'utils/api';
import {RespuestaSoporteNuevo} from 'interface/soporte';
import {useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import ContenedorAnimado from 'common/ContendorAnimado';
import { Keyboard } from 'react-native';

const Contactanos = () => {
  const toast = useToast();
  const [descripcion, setDescripcion] = useState<string>('');
  const usuarioCodigo = useSelector((state: RootState) => state.usuario.id);
  const [mostrarAnimacionCargando, setMostrarAnimacionCargando] =
    useState<boolean>(false);

  const guardarSoporte = async () => {
    setMostrarAnimacionCargando(true);
    Keyboard.dismiss();
    if (descripcion !== '') {
      const respuestaApiCasoNuevo: RespuestaSoporteNuevo = await consultarApi(
        'api/soporte/nuevo',
        {
          codigoUsuario: usuarioCodigo,
          descripcion,
        },
      );

      if (respuestaApiCasoNuevo.error === false) {
        setMostrarAnimacionCargando(false);

        setDescripcion('');
        toast.show({
          title: 'Éxito',
          description: 'El soporte registrado con éxito',
        });
      } else {
        setMostrarAnimacionCargando(false);

        toast.show({
          title: 'Algo ha salido mal',
          description: respuestaApiCasoNuevo.errorMensaje,
        });
      }
    } else {
      setMostrarAnimacionCargando(false);

      toast.show({
        title: 'Algo ha salido mal',
        description: 'El campo descripción es obligatorio',
      });
    }
  };

  return (
    <Contenedor>
      <ContenedorAnimado>
        <VStack space={3}>
          <FormControl>
            <FormControl.Label isRequired>Descripción</FormControl.Label>
            <TextArea
              h={'48'}
              placeholder="Proporciona detalles sobre el soporte técnico requerido. Por favor, incluya información relevante sobre el problema, cualquier mensaje de error recibido y cualquier paso previo tomado para resolver la situación. Cuanta más información proporcione, más fácil será para nuestro equipo de soporte identificar y abordar su solicitud. ¡Gracias por su colaboración!"
              onChangeText={text => setDescripcion(text)}
              value={descripcion}
              autoCompleteType={undefined}
            />
          </FormControl>
          <Button
            mt="2"
            onPress={() => guardarSoporte()}
            isLoading={mostrarAnimacionCargando}
            isLoadingText="Cargando">
            Confirmar
          </Button>
        </VStack>
      </ContenedorAnimado>
    </Contenedor>
  );
};

export default Contactanos;
