import { BaseSchema } from 'yup';

import { validateCPF } from '../../../../utils/validation/cpf';

export function cpf(this: BaseSchema, message: string | undefined) {
  return this.test('cpf', message ?? 'Campo inválido', (value: string) => {
    let checkValue = value;

    if (!checkValue || checkValue?.length === 0) return true;

    checkValue = checkValue.replace(/\D/g, '');

    if (checkValue.length === 11) return validateCPF(checkValue);

    return false;
  });
}
