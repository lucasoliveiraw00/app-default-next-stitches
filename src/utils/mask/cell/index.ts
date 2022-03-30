import { mask } from '../mask';

/**
 * Receives Cell value and returns formatted "(00) 0000-0000" | "(00) 00000-0000"
 *
 * @param string value - Value to format
 * @return string - Formatted value
 *
 */
export function cell(value: string): string {
  const characters = value.replace(/\D/g, '');
  if (characters.length > 10) return mask(value, '(00) 00000-0000');
  return mask(value, '(00) 0000-0000');
}
