import isMatch from 'date-fns/isMatch';
import { BaseSchema } from 'yup';

export function dateMatch(this: BaseSchema, message: string | undefined) {
  return this.test('dateMatch', message ?? 'Data inválida', (value: string) => {
    const checkValue = value;

    if (!checkValue) return true;

    const checkValue1 = isMatch(checkValue, 'yyyy-MM-dd');
    const checkValue2 = isMatch(checkValue, 'dd/MM/yyyy');

    return checkValue1 || checkValue2;
  });
}
