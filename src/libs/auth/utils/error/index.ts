/* eslint-disable @typescript-eslint/no-explicit-any */

type FilteredErrorData = {
  type: 'error' | 'warning' | 'info' | 'success';
  typeCode: string | number | null;
  code: number | string;
  name: string;
  details: {
    [key: string]: string | string[];
  } | null;
  message: string;
  extra: any;
};

/**
 * Receive error data, return filtered error data
 *
 * @param error Error
 * @return Error filtered
 *
 */
export function filteredErrorData(error: Error | any): FilteredErrorData {
  const { response = null } = error;

  let name;
  let details;
  let message = 'Ocorreu um erro interno. Tente novamente mais tarde!';
  let type = 'error';
  let typeCode = null;
  let code = 500;

  if (error?.message) message = error.message;

  if (error?.name) name = error.name;

  if (response) {
    const { data = null } = response;

    if (data?.type) type = data.type;

    if (data?.message) message = data.message;

    if (data?.error?.code) typeCode = data.error.code;

    if (data?.error?.details) details = data.error.details;

    if (data?.error?.message) message = data.error.message;

    code = response.status;
  }

  return {
    type,
    code,
    typeCode,
    name,
    details,
    message,
    extra: error,
  } as FilteredErrorData;
}
