import { mask } from '../mask';

/**
 * Receives CPF value and returns formatted "000.000.000-00"
 *
 * @param string value - Value to format
 * @return string - Formatted value
 *
 */
export function cpf(value: string): string {
  return mask(value, '000.000.000-00');
}
