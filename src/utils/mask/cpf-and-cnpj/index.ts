import { cnpj } from '../cnpj';
import { cpf } from '../cpf';

/**
 * Receives value from CPF and CNPJ and returns formatted "000.000.000-00" / "00.000.000/0000-00"
 *
 * @param string value - Value to format
 * @return string - Formatted value
 *
 */
export function cpfAndCnpj(value: string): string {
  const characters = value.replace(/\D/g, '');
  if (characters.length > 11) return cnpj(value);
  return cpf(value);
}
