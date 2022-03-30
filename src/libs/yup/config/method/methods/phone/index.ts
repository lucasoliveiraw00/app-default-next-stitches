import { BaseSchema } from 'yup';

export function phone(this: BaseSchema, message: string | undefined) {
  return this.test('phone', message ?? 'Campo inválido', (value: string) => {
    const checkValue = value;

    if (!checkValue || checkValue.length === 0) return true;

    // eslint-disable-next-line no-useless-escape
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return re.test(checkValue);
  });
}
