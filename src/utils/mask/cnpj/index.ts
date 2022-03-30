import { mask } from '../mask';

/**
 * Receives CNPJ value and returns formatted "00.000.000/0000-00"
 *
 * @param string value - Value to format
 * @return string - Formatted value
 *
 */
export function cnpj(value: string): string {
  return mask(value, '00.000.000/0000-00');
}
