import { BaseSchema } from 'yup';

export function maxLength(
  this: BaseSchema,
  count: number,
  message: string | undefined,
) {
  return this.test(
    'maxLength',
    message ?? 'Campo inválido',
    (value: number) => {
      const checkValue = value;

      if (!checkValue) return true;

      if (String(checkValue).length > count) return false;

      return true;
    },
  );
}
