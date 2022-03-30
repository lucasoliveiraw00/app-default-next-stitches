import { mask } from '../mask';

/**
 * Receives Date value and returns formatted "00/00/0000"
 *
 * @param string value - Value to format
 * @return string - Formatted value
 *
 */
export function date(value: string): string {
  return mask(value, '00/00/0000');
}
