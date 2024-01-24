import React, {useState} from 'react';
import Contenedor from 'common/Contenedor';
import {Button, FormControl, TextArea, VStack, useToast} from 'native-base';
import {RootState} from 'store/reducers';
import {RespuestaAtencionNuevo} from 'interface/atencion';
import {shallowEqual, useSelector} from 'react-redux';
import {consultarApi} from 'utils/api';
import ContenedorAnimado from 'common/ContendorAnimado';

const AtencionNuevo = () => {
  const toast = useToast();
  const [descripcion, setDescripcion] = useState<string>('');
  const [mostrarAnimacionCargando, setMostrarAnimacionCargando] =
    useState<boolean>(false);
  const usuario = useSelector((state: RootState) => {
    return {
      codigo: state.usuario.id,
      celda: state.usuario.celdaId,
    };
  }, shallowEqual);

  const guardarSoporte = async () => {
    setMostrarAnimacionCargando(true);
    if (descripcion !== '') {
      const respuestaApiCasoNuevo: RespuestaAtencionNuevo = await consultarApi(
        'api/atencion/nuevo',
        {
          codigoUsuario: usuario.codigo,
          codigoCelda: usuario.celda,
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
            <FormControl.Label isRequired>Mensaje</FormControl.Label>
            <TextArea
              h={20}
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

export default AtencionNuevo;
