import React, {useState} from 'react';
import {Image} from 'react-native';
import {
  Button,
  FormControl,
  Input,
  ScrollView,
  useToast,
  VStack,
  Box,
} from 'native-base';
import {validarCorreoElectronico} from '../../utils/funciones';
import {consultarApi} from '../../utils/api';
import Contenedor from 'common/Contenedor';
import {useNavigation} from '@react-navigation/native';
import {RespuestaUsuarioRecuperarClave} from 'interface/usuario';
import ContenedorAnimado from 'common/ContendorAnimado';

function OlvidoContrasena() {
  const toast = useToast();
  const [usuario, setUsuario] = useState('');
  const navigation = useNavigation();

  const recuperarContrasena = async () => {
    if (validarCorreoElectronico(usuario)) {
      const {respuesta, status} =
        await consultarApi<RespuestaUsuarioRecuperarClave>(
          'api/usuario/recuperarclave',
          {usuario},
        );
      if (status === 200) {
        navigation.goBack();
        toast.show({
          title: 'Correcto',
          description:
            'Se ha enviado un correo electrónico con a información de recuperación de contraseña',
        });
      }
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: 'El correo válido',
      });
    }
  };

  const habilitarBtnGuardar = usuario === '';

  return (
    <Contenedor>
      <VStack space={2}>
        <Box mt="5" alignItems="center" justifyContent="center">
          <ContenedorAnimado delay={100}>
            <Image
              style={{width: 128, height: 128}}
              source={require('../../assets/img/logo-fondo-blanco.png')}
            />
          </ContenedorAnimado>
        </Box>
        <ScrollView>
          <ContenedorAnimado delay={200}>
            <FormControl isRequired={true}>
              <FormControl.Label
                _text={{
                  color: 'coolGray.800',
                  fontSize: 'md',
                  fontWeight: 500,
                }}>
                Correo
              </FormControl.Label>
              <Input
                keyboardType={'email-address'}
                onChangeText={valor => setUsuario(valor)}
              />
            </FormControl>
            <Button
              mt="2"
              isDisabled={habilitarBtnGuardar}
              onPress={() => recuperarContrasena()}>
              Guardar
            </Button>
          </ContenedorAnimado>
        </ScrollView>
      </VStack>
    </Contenedor>
  );
}

export default OlvidoContrasena;
