import * as Yup from 'yup';

export const signUpSchema = Yup.object().shape({
    accountName: Yup.string()
        .required('Pole jest wymagane'),

    age: Yup.string()
        .required('Pole jest wymagane'),

    email: Yup.string()
        .email('Pole jest wymagane')
        .required('Pole jest wymagane'),

    password: Yup.string()
        .required('Pole jest wymagane'),

    repeatedPassword: Yup.string().when("password", {

        is: (val: any[]) => (val && val.length > 0 ? true : false),

        then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Pole jest wymagane"
        )
    }),

    role: Yup.string()
        .required('Pole jest wymagane')
});

export const profileSchema = Yup.object().shape({
    accountName: Yup.string()
        .required('Pole jest wymagane'),

    age: Yup.string()
        .required('Pole jest wymagane'),

    email: Yup.string()
        .email('Pole jest wymagane')
        .required('Pole jest wymagane'),

    role: Yup.string()
        .required('Pole jest wymagane')
});