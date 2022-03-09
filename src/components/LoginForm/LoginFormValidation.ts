import * as Yup from 'yup';

export const schema = Yup.object().shape({
    login: Yup.string()
        .email('Pole jest wymagane')
        .required('Pole jest wymagane'),

    password: Yup.string()
        .required('Pole jest wymagane')
});