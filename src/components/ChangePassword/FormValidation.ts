import * as Yup from 'yup';

export const schema = Yup.object().shape({
    oldPassword: Yup.string()
        .required('Pole jest wymagane'),

    newPassword: Yup.string()
        .required('Pole jest wymagane'),

    repeatNewPassword: Yup.string().when("newPassword", {

        is: (val: any[]) => (val && val.length > 0 ? true : false),

        then: Yup.string().oneOf(
            [Yup.ref("newPassword")],
            "Pole jest wymagane"
        )
    })
});