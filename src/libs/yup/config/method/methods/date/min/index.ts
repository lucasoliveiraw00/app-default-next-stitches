import isMatch from 'date-fns/isMatch';
import isAfter from 'date-fns/isAfter';

import { BaseSchema } from 'yup';

function dateEUA(value: string): string {
  if (!value || value?.length === 0) return value;
  return value.replace(/(\d*)\/(\d*)\/(\d*).*/, '$3-$2-$1');
}

export function dateMin(
  this: BaseSchema,
  date: string,
  message: string | undefined,
) {
  const newMessage = message ?? `Deve ser maior que a data ${date}`;
  return this.test('dateMin', newMessage, (value: string) => {
    const valueValidate = value;

    if (!valueValidate) return true;

    const isFormatDateBR = isMatch(date, 'dd/MM/yyyy');
    const isFormatDateEUA = isMatch(date, 'yyyy-MM-dd');

    if (isFormatDateBR) {
      const checkFormatDateBR = isMatch(valueValidate, 'dd/MM/yyyy');
      if (!checkFormatDateBR) return false;
      const minDate = new Date(`${dateEUA(date)} 00:00:00`);
      const currentDate = new Date(`${dateEUA(value)} 00:00:00`);
      const isMinDateBR = isAfter(minDate, currentDate);
      if (isMinDateBR) return false;
      return true;
    }

    if (isFormatDateEUA) {
      const checkFormatDateEUA = isMatch(valueValidate, 'yyyy-MM-dd');
      if (!checkFormatDateEUA) return false;
      const minDate = new Date(`${date} 00:00:00`);
      const currentDate = new Date(`${value} 00:00:00`);
      const isMinDateEUA = isAfter(minDate, currentDate);
      if (isMinDateEUA) return false;
      return true;
    }

    if (!isFormatDateBR || !isFormatDateEUA) {
      throw new Error('Date with wrong format');
    }

    return true;
  });
}
