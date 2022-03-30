import { BaseSchema } from 'yup';

import { validateCNPJ } from '../../../../utils/validation/cnpj';
import { validateCPF } from '../../../../utils/validation/cpf';

export function cpfAndCnpj(this: BaseSchema, message: string | undefined) {
  return this.test(
    'cpfAndCnpj',
    message ?? 'Campo inválido',
    (value: string) => {
      let checkValue = value;

      if (!checkValue || checkValue?.length === 0) return true;

      checkValue = checkValue.replace(/\D/g, '');

      if (checkValue.length === 14) {
        return validateCNPJ(checkValue);
      }

      if (checkValue.length === 11) return validateCPF(checkValue);

      return false;
    },
  );
}
