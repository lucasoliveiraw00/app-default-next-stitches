/**
 * Recebe um valor e retorna valor formatado
 *
 * @param string value - Valor a ser formatado
 * @param string Mascara - Marcara para formatar "000.000.000-00"
 * @return string - Valor formatado
 *
 */
export function mask(value: string, Mask: string): string {
  let valueToMask = value;

  if (!valueToMask || valueToMask.length === 0) return '';

  const cleanMask = String(Mask).replace(/\D/g, '');
  const cleanValue = String(value).replace(/\D/g, '');

  if (cleanValue.length > cleanMask.length)
    return value.substring(0, Mask.length);

  const er = /[^0-9/ (),.-]/;

  er.lastIndex = 0;

  if (er.test(valueToMask)) {
    valueToMask = valueToMask.substring(0, valueToMask.length - 1);
  }

  let isMask;

  let exp = /\-|\.|\/|\(|\)| /g; //eslint-disable-line

  const fieldNumber = valueToMask.toString().replace(exp, '');
  let newValue = '';
  let positionField = 0;
  let sizeMask = fieldNumber.length;
  for (let i = 0; i <= sizeMask; i += 1) {
    isMask =
      Mask.charAt(i) === '-' ||
      Mask.charAt(i) === '.' ||
      Mask.charAt(i) === '/';
    isMask =
      isMask ||
      Mask.charAt(i) === '(' ||
      Mask.charAt(i) === ')' ||
      Mask.charAt(i) === ' ';

    if (isMask) {
      newValue += Mask.charAt(i);
      sizeMask += 1;
    } else {
      newValue += fieldNumber.charAt(positionField);
      positionField += 1;
    }
  }

  let characters = Mask.split(/[0-9]/).filter(item => item.length > 0 && item);

  characters = characters.map(item => item.trim());

  if (characters.includes(newValue.trim().substr(newValue.trim().length - 1))) {
    return valueToMask;
  }

  return newValue;
}
