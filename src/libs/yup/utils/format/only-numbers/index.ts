/**
 * Recebe uma string com outros caracteres além de números e retorna apenas números
 *
 * @param string string - only numbers - 123456789
 * @return string - Números sem pontos, caracteres especiais ou espaços
 *
 */
function onlyNumbers(value: string): string {
  if (!value || value?.length === 0) return value;

  return value?.replace(/[^0-9]/g, '');
}

export { onlyNumbers };
