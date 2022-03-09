import * as Yup from 'yup';

export const schema = Yup.object().shape({
    email: Yup.string()
        .email('Pole jest wymagane')
        .required('Pole jest wymagane')
});