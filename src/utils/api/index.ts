import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios, {AxiosResponse} from 'axios';

const URL_BASE = 'http://yodoapi.online/';

interface Configuracion {
  method?: 'post' | 'get' | 'put' | 'delete';
  requiereToken?: boolean;
}

const axios = Axios.create();

export const consultarApi = async <T>(
  urlConsulta: string,
  data: any,
  configuracion: Configuracion = {
    requiereToken: true,
  },
): Promise<{status: number; respuesta: T}> => {
  axios.interceptors.request.use(
    async axiosPeticion => {
      if (configuracion.requiereToken) {
        const jwtToken = await AsyncStorage.getItem('jwtToken');
        axiosPeticion.headers.Authorization = `Bearer ${jwtToken}`;
      }
      return axiosPeticion;
    },
    error => {
      return Promise.reject(error);
    },
  );

  const informacionConsulta: AxiosResponse<T> = await axios({
    method: configuracion.method ?? 'post',
    url: URL_BASE + urlConsulta,
    data,
  });

  return {
    status: informacionConsulta.status,
    respuesta: informacionConsulta.data,
  };
};
