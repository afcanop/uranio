import React from 'react';
import {Text} from 'native-base';
import HojaDeEstiloGenerales from '../assets/HojaDeEstiloGenerales';
import {StyleSheet} from 'react-native';

interface TextoFechaProps {
  fecha: string | null;
  mensaje?: string;
  visualizarHora?: boolean;
  textoGeneral?: boolean;
  textoBold?: boolean;
  style?: Record<string, any>; // Puedes ajustar el tipo de 'style' según tus necesidades.
}

const TextoFecha: React.FC<TextoFechaProps> = ({
  fecha,
  mensaje,
  visualizarHora = true,
  textoGeneral,
  textoBold,
  style,
}) => {
  const existeMensaje = mensaje !== undefined ? mensaje : null;

  let estiloTexto = StyleSheet.flatten([
    textoBold !== undefined && HojaDeEstiloGenerales.textoGeneralBold,
    textoGeneral !== undefined && HojaDeEstiloGenerales.textoGeneral,
    style,
  ]);

  // Validamos si el objeto estiloTexto está vacío; de ser verdadero, ponemos un diseño de texto general.
  if (Object.keys(estiloTexto).length === 0) {
    estiloTexto = HojaDeEstiloGenerales.textoGeneral;
  }

  return (
    <>
      {fecha !== null ? (
        <Text style={[estiloTexto]}>
          {existeMensaje}
          {` ${fecha.substring(0, 10)}`}
          {visualizarHora ? ` ${fecha.substring(11, 16)}` : null}
        </Text>
      ) : null}
    </>
  );
};

export default TextoFecha;
