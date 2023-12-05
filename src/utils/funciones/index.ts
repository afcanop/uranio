import dayjs from 'dayjs';

export const fechaActual = (): {fecha: string; hora: string} => {
  const ObjFecha = new Date();
  let dia: number = ObjFecha.getDate();
  let mes: number = ObjFecha.getMonth() + 1;
  let anio: number = ObjFecha.getFullYear();
  let hora: number = ObjFecha.getHours();
  let minutos: number = ObjFecha.getMinutes();

  return {
    fecha: `${anio}-${mes}-${dia}`,
    hora: `${hora}:${minutos}`,
  };
};

export const validarCaracteresAlfanumericos = (number: string): boolean => {
  const re = /^[a-zA-Z0-9]+$/;
  if (number === '') {
    return true;
  }
  return re.test(number);
};

export const validarCorreoElectronico = (
  correoElectronico: string,
): boolean => {
  const expresionRegular =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (correoElectronico === '') {
    return true;
  }
  return expresionRegular.test(correoElectronico);
};

export const calcularFecha = (fecha: string): string => {
  const fechaActual = dayjs();
  const fechaChat = dayjs(fecha);
  let diferenciaDias = fechaChat.diff(fechaActual, 'days');
  if (diferenciaDias === 0) {
    let diferenciaHoras = fechaChat.diff(fechaActual, 'hour');
    if (diferenciaHoras === 0) {
      let diferenciaMinutos = fechaChat.diff(fechaActual, 'minute');
      return diferenciaMinutos === 0
        ? 'Ahora'
        : `${diferenciaMinutos.toString().slice(1)} minutos`;
    } else {
      return `${diferenciaHoras.toString().slice(1)} horas`;
    }
  } else if (diferenciaDias === 1) {
    return 'Ayer';
  } else {
    return `${fechaChat.format('MM DD YY')} `;
  }
};

export const renombrarClave = (
  object: {[key: string]: any},
  key: string,
  newKey: string,
): {[key: string]: any} => {
  const clonedObj = {...object};
  const targetKey = clonedObj[key];
  delete clonedObj[key];
  clonedObj[newKey] = targetKey;
  return clonedObj;
};
