import { mask } from '../mask';

/**
 * Receives Phone value and returns formatted "(00) 0000-0000" | "0000-0000"
 *
 * @param string value - Value to format
 * @param boolean ddd - Add ddd in formatting
 * @return string - Formatted value
 *
 */
export function phone(value: string, ddd = true): string {
  if (!ddd) return mask(value, '0000-0000');
  return mask(value, '(00) 0000-0000');
}
