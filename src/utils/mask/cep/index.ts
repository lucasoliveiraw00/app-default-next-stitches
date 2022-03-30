import { mask } from '../mask';

/**
 * Receives CEP value and returns formatted "00000-000"
 *
 * @param string value - Value to format
 * @return string - Formatted value
 *
 */
export function cep(value: string): string {
  return mask(value, '00000-000');
}
