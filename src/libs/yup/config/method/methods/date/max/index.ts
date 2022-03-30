import isMatch from 'date-fns/isMatch';
import isBefore from 'date-fns/isBefore';

import { BaseSchema } from 'yup';

function dateEUA(value: string): string {
  if (!value || value?.length === 0) return value;
  return value.replace(/(\d*)\/(\d*)\/(\d*).*/, '$3-$2-$1');
}

export function dateMax(
  this: BaseSchema,
  date: string,
  message: string | undefined,
) {
  const newMessage = message ?? `Deve ser menor que a data ${date}`;
  return this.test('dateMax', newMessage, (value: string) => {
    const valueValidate = value;

    if (!valueValidate) return true;

    const isFormatDateBR = isMatch(date, 'dd/MM/yyyy');
    const isFormatDateEUA = isMatch(date, 'yyyy-MM-dd');

    if (isFormatDateBR) {
      const checkFormatDateBR = isMatch(valueValidate, 'dd/MM/yyyy');
      if (!checkFormatDateBR) return false;
      const maxDate = new Date(`${dateEUA(date)} 00:00:00`);
      const currentDate = new Date(`${dateEUA(value)} 00:00:00`);
      const isMaxDateBR = isBefore(maxDate, currentDate);
      if (isMaxDateBR) return false;
      return true;
    }

    if (isFormatDateEUA) {
      const checkFormatDateEUA = isMatch(valueValidate, 'yyyy-MM-dd');
      if (!checkFormatDateEUA) return false;
      const maxDate = new Date(`${date} 00:00:00`);
      const currentDate = new Date(`${value} 00:00:00`);
      const isMaxDateEUA = isBefore(maxDate, currentDate);
      if (isMaxDateEUA) return false;
      return true;
    }

    if (!isFormatDateBR || !isFormatDateEUA) {
      throw new Error('Date with wrong format');
    }

    return true;
  });
}
