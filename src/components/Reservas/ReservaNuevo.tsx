/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState} from 'react';
import {
  Reserva,
  respuestaReservaLista,
  respuestaReservaNuevo,
  respuestaReservaReserva,
} from 'interface/reserva';
import {
  Box,
  Center,
  FlatList,
  useToast,
  Text,
  HStack,
  Button,
  FormControl,
  TextArea,
} from 'native-base';
import {useSelector} from 'react-redux';
import {consultarApi} from 'utils/api';
import {RootState} from 'store/reducers';
import Contenedor from 'common/Contenedor';
import colores from 'assets/theme/colores';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {
  mesNombres,
  mesNombresCortos,
  nombresDia,
  nombresDiaCorto,
} from 'utils/const';
import {fechaActual} from 'utils/funciones';
import {DateData, MarkedDates} from 'react-native-calendars/src/types';
import dayjs, {Dayjs} from 'dayjs';
import ContenedorAnimado from 'common/ContendorAnimado';

LocaleConfig.locales['es'] = {
  monthNames: mesNombres,
  monthNamesShort: mesNombresCortos,
  dayNames: nombresDia,
  dayNamesShort: nombresDiaCorto,
  today: 'Hoy',
};

LocaleConfig.defaultLocale = 'es';

const ReservaNuevo = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [arrReservas, setArrReservas] = useState<Reserva[]>([]);
  const [fechasMarcadas, setFechasMarcadas] = useState<MarkedDates>({});
  const [fechasMarcada, setFechasMarcada] = useState<string>('');
  const [comentario, setComentario] = useState<string>('');
  const [mostrarAnimacionCargando, setMostrarAnimacionCargando] =
    useState<boolean>(false);
  const [
    mostrarAnimacionCargandoCalendario,
    setMostrarAnimacionCargandoCalendario,
  ] = useState<boolean>(false);

  const usuarioCodigoCelda = useSelector(
    (state: RootState) => state.usuario.codigoCelda,
  );

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarReservaLista();
      unsubscribe();
    }, []),
  );

  const consultarReservaLista = async () => {
    const respuestaApiReservaLista: respuestaReservaLista = await consultarApi(
      'api/reserva/lista',
      {
        codigoPanal: 1,
      },
    );
    if (respuestaApiReservaLista.error === false) {
      setArrReservas(respuestaApiReservaLista.reservas);
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiReservaLista.errorMensaje,
      });
    }
  };

  const agregarNuevoFechaMarcada = (
    facha: string,
    seleccionadoUsuario: boolean,
  ) => {
    //Comprueba si la fecha ya existe en el estado
    if (!fechasMarcadas[facha]) {
      // Agrega un nuevo objeto al estado
      const selectedColor = seleccionadoUsuario
        ? colores.primary
        : colores.base['100'];

      setFechasMarcadas(prevEstado => ({
        ...prevEstado,
        [facha]: {
          selected: true,
          selectedTextColor: colores.blanco,
          selectedColor: selectedColor,
          disabled: seleccionadoUsuario ? false : true,
          disableTouchEvent: !seleccionadoUsuario ? true : false,
        },
      }));
      if (seleccionadoUsuario) {
        setFechasMarcada(facha);
      }
    } else {
      // retirar objeto al estado
      if (seleccionadoUsuario) {
        const {[facha]: fechaEliminada, ...nuevoEstado} = fechasMarcadas;
        setFechasMarcadas(nuevoEstado);
        setFechasMarcada('');
      }
    }
  };

  const seleccionarReserva = async (item: Reserva) => {
    setReserva(item);
    setMostrarAnimacionCargandoCalendario(true);
    const fechaActual: Dayjs = dayjs();
    const respuestaApiReservaReserva: respuestaReservaReserva =
      await consultarApi('api/reserva/reserva', {
        codigoReserva: item.codigoReservaPk,
        anio: fechaActual.year(),
        mes: fechaActual.month() + 1,
      });
    if (respuestaApiReservaReserva.error === false) {
      respuestaApiReservaReserva.reservasDetalles.forEach(detalle => {
        // Extraer la fecha de cada detalle
        const nuevaFecha = detalle.fecha.slice(0, 10); // Tomar solo la parte de la fecha
        // Llamar a la función para agregar o eliminar la fecha
        agregarNuevoFechaMarcada(nuevaFecha, false);
      });
      setMostrarAnimacionCargandoCalendario(false);
    } else {
      setMostrarAnimacionCargandoCalendario(false);
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiReservaReserva.errorMensaje,
      });
    }
  };

  const guardarReserva = async () => {
    setMostrarAnimacionCargando(true);
    if (fechasMarcada !== '' && reserva !== null) {
      const respuestaApiReservaNueva: respuestaReservaNuevo =
        await consultarApi('api/reserva/detallenuevo', {
          codigoCelda: usuarioCodigoCelda,
          codigoReserva: reserva.codigoReservaPk,
          fecha: fechasMarcada,
        });

      if (respuestaApiReservaNueva.error === false) {
        navigation.goBack();
        toast.show({
          title: 'Exito',
          description: 'Reserva guarda con exito',
        });
      } else {
        setMostrarAnimacionCargando(false);
        toast.show({
          title: 'Algo ha salido mal',
          description: respuestaApiReservaNueva.errorMensaje,
        });
      }
    } else {
      setMostrarAnimacionCargando(false);
      toast.show({
        title: 'Algo ha salido mal',
        description: 'Se requiere seleccionar una fecha',
      });
    }
  };

  const cambiosMes = async (fecha: DateData) => {
    const fechaActual: Dayjs = dayjs();
    const respuestaApiReservaReserva: respuestaReservaReserva =
      await consultarApi('api/reserva/reserva', {
        codigoReserva: reserva?.codigoReservaPk,
        anio: fecha.year,
        mes: fecha.month,
      });
    if (respuestaApiReservaReserva.error === false) {
      respuestaApiReservaReserva.reservasDetalles.forEach(detalle => {
        // Extraer la fecha de cada detalle
        const nuevaFecha = detalle.fecha.slice(0, 10); // Tomar solo la parte de la fecha
        // Llamar a la función para agregar o eliminar la fecha
        agregarNuevoFechaMarcada(nuevaFecha, false);
      });
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiReservaReserva.errorMensaje,
      });
    }
  };

  const renderCustomArrow = (direction: 'left' | 'right') => {
    // direction puede ser 'left' o 'right'
    const icon =
      direction === 'left' ? 'arrow-back-outline' : 'arrow-forward-outline';

    return (
      <Box>
        <Ionicons name={icon} size={30} color={colores.base['600']} />
      </Box>
    );
  };

  return (
    <Contenedor>
      {reserva ? (
        <ContenedorAnimado>
          <Box
            marginBottom={2}
            padding={2}
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1">
            <HStack justifyContent={'space-between'}>
              <Text
                fontSize={'3xl'}
                fontWeight={'bold'}
                color={colores.primary}>
                {reserva.nombre}
              </Text>
              <TouchableOpacity onPress={() => setReserva(null)}>
                <Ionicons
                  name="close-outline"
                  size={50}
                  color={colores.rojo['500']}
                />
              </TouchableOpacity>
            </HStack>
            <Calendar
              onDayPress={day => agregarNuevoFechaMarcada(day.dateString, true)}
              minDate={fechaActual().fecha}
              markedDates={fechasMarcadas}
              onMonthChange={date => cambiosMes(date)}
              displayLoadingIndicator={mostrarAnimacionCargandoCalendario}
              hideExtraDays={true}
              enableSwipeMonths={true}
              renderArrow={renderCustomArrow}
              style={mostrarAnimacionCargandoCalendario ? {opacity: 0.5} : null}
            />
            <FormControl>
              <FormControl.Label>Comentario</FormControl.Label>
              <TextArea
                h={20}
                placeholder="Ejemplo: Personas: [Número], Hora Inicio: HH:MM AM/PM, Hora Fin: HH:MM AM/PM."
                onChangeText={text => setComentario(text)}
                value={comentario}
                autoCompleteType={undefined}
              />
            </FormControl>
            <Button
              mt="2"
              onPress={() => guardarReserva()}
              isLoading={mostrarAnimacionCargando}
              isLoadingText="Cargando">
              Confirmar
            </Button>
          </Box>
        </ContenedorAnimado>
      ) : (
        <FlatList
          data={arrReservas}
          renderItem={({item, index}) => (
            <ContenedorAnimado delay={50 * index}>
              <TouchableOpacity onPress={() => seleccionarReserva(item)}>
                <Box
                  marginBottom={2}
                  padding={2}
                  rounded="lg"
                  overflow="hidden"
                  borderColor="coolGray.200"
                  borderWidth="1"
                  justifyContent={'space-between'}>
                  <Center>
                    <Text
                      fontSize={'3xl'}
                      fontWeight={'bold'}
                      color={colores.primary}>
                      {item.nombre}
                    </Text>
                  </Center>
                  <Text mt={2}>{item.descripcion}</Text>
                </Box>
              </TouchableOpacity>
            </ContenedorAnimado>
          )}
          keyExtractor={item => `${item.codigoReservaPk}`}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </Contenedor>
  );
};

export default ReservaNuevo;
