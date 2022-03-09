import { FormikProps } from "formik";
import { FC } from "react";
import { ISignUpField } from "../../shared/consts/fieldsData/registrationFields";

interface ICustomInput {
    fieldData: ISignUpField,
    formikProps: FormikProps<any>
};

export const CustomInput: FC<ICustomInput> = ({ fieldData, formikProps }) => {

    return (
        <>
            <label htmlFor={`${fieldData?.label?.htmlFor}`}>
                {fieldData?.label?.value}
            </label>

            <input
                type={fieldData.type}
                name={fieldData.id}
                id={fieldData.id}
                placeholder={fieldData.placeholder}
                onChange={formikProps.handleChange}
                value={formikProps.values[fieldData.id] || ''}
                onBlur={formikProps.handleBlur}
            />
            {
                formikProps.errors[fieldData.id]
                &&
                formikProps.touched[fieldData.id]
                &&
                <div className="error">
                    {formikProps.errors[fieldData.id]}
                </div>
            }
        </>
    );
}