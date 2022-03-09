import { FormikProps } from 'formik';
import { FC } from 'react';
import { useRouteMatch } from 'react-router';
import { IUserType } from '../../shared/consts/fieldsData/registrationFields';
import { userRoutes } from '../../shared/consts/url/routes';

interface ICustomRadioBtn {
    fieldData: IUserType,
    formikProps: FormikProps<any>,
    userRole?: string
};

export const CustomRadioBtn: FC<ICustomRadioBtn> = ({ fieldData, formikProps, userRole }) => {
    const { path } = useRouteMatch();
    const isDisabled = path === userRoutes.profile;

    return (
        <>
            <input
                type={fieldData.input.type}
                name={fieldData.input.name}
                id={fieldData.input.id}
                value={fieldData.input.value}
                disabled={isDisabled}
                onChange={() =>
                    formikProps.setFieldValue("role", fieldData.input.value)
                }
                checked={
                    ((path === userRoutes.profile)
                        &&
                        (fieldData.input.value === userRole))
                        ? true
                        : undefined
                }
            />
            <label htmlFor={fieldData.label.htmlFor}>
                {fieldData.label.value}
            </label>
        </>
    )
}
