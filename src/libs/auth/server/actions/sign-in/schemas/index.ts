import * as yup from 'yup';

export const signInSchema = yup.object({
  userName: yup.string().required(),
  password: yup.string().required(),
});
