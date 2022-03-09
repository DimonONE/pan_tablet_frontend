import * as Yup from 'yup';

export const addWorkSchema = Yup.object().shape({
    email: Yup.string()
        .email('Pole jest wymagane')
        .required('Pole jest wymagane'),

    phone: Yup.string()
        .required('Pole jest wymagane'),
});