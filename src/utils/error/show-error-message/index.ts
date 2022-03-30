/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast, ToastOptions } from 'react-toastify';

import { filterErrorData } from '../filter-error-data';

/**
 * Receive error data and display toast with error message
 *
 * @param error Error - Data to be displayed
 * @return String message
 *
 */
export function showErrorMessage(
  error: Error | any,
  id: string | number | undefined = undefined,
): string {
  const { type, message, details } = filterErrorData(error);

  function showToastMessage(
    toastMessage: string,
    options: ToastOptions<Record<string, never>> | undefined = undefined,
  ) {
    if (id && toast[type] && !toast.isActive(id)) {
      toast[type](toastMessage, options);
      return;
    }
    toast[type](toastMessage, options);
  }

  if (!details) {
    showToastMessage(message);
    return message;
  }

  if (details && typeof details === 'string') {
    showToastMessage(details);
    return details;
  }

  if (details && typeof details === 'object') {
    const detailsMessage = Object.keys(details || '{}').reduce(
      (previousValue, key) => {
        if (key.length === 0) return previousValue;
        const label = key.charAt(0).toUpperCase() + key.substr(1);
        let value = details[key];
        if (typeof value === 'string')
          return `${previousValue}${label}: \n ${value} \n\n`;
        value = value.join('\n ');
        return `${previousValue}${label}: \n ${value} \n\n`;
      },
      '',
    );

    if (detailsMessage.length === 0) return detailsMessage;

    showToastMessage(`${detailsMessage}`, {
      bodyStyle: { whiteSpace: 'pre-wrap' },
    });

    return detailsMessage;
  }

  return message;
}
