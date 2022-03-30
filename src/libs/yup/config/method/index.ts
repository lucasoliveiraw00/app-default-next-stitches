import 'yup';
import * as Yup from 'yup';

import { Message } from 'yup/lib/types';

import { cpfAndCnpj } from './methods/cpf-and-cnpj';
import { phone } from './methods/phone';
import { maxLength } from './methods/max-length';
import { cnpj } from './methods/cnpj';
import { cpf } from './methods/cpf';
import { dateMatch, dateMax, dateMin } from './methods/date';

declare module 'yup' {
  export interface StringSchema {
    cpf(message?: Message): this;
    cnpj(message?: Message): this;
    cpfAndCnpj(message?: Message): this;
    phone(message?: Message): this;
    dateMatch(message?: Message): this;
    /**
     * Set max value date
     *
     * @param string date - Value format 00/00/00 or 00-00-0000
     * @param string message - Message error
     * @return boolean - Error value
     *
     */
    dateMax(date: string, message?: Message): this;
    /**
     * Set max value date
     *
     * @param string date - Value format 00/00/00 or 00-00-0000
     * @param string message - Message error
     * @return boolean - Error value
     *
     */
    dateMin(date: string, message?: Message): this;
    maxLength(message?: Message): this;
  }
}
Yup.addMethod(Yup.string, 'cpf', cpf);
Yup.addMethod(Yup.string, 'cnpj', cnpj);
Yup.addMethod(Yup.string, 'cpfAndCnpj', cpfAndCnpj);
Yup.addMethod(Yup.string, 'phone', phone);
Yup.addMethod(Yup.string, 'dateMatch', dateMatch);
Yup.addMethod(Yup.string, 'dateMax', dateMax);
Yup.addMethod(Yup.string, 'dateMin', dateMin);
Yup.addMethod(Yup.number, 'maxLength', maxLength);

export default Yup;
