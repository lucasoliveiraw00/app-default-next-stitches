import { BaseSchema } from 'yup';

import { validateCNPJ } from '../../../../utils/validation/cnpj';

export function cnpj(this: BaseSchema, message: string | undefined) {
  return this.test('cnpj', message ?? 'Campo inválido', (value: string) => {
    let checkValue = value;

    if (!checkValue || checkValue?.length === 0) return true;

    checkValue = checkValue.replace(/\D/g, '');

    if (checkValue.length === 14) {
      return validateCNPJ(checkValue);
    }

    return false;
  });
}
