import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordFields } from '../../shared/consts/fieldsData/changePasswordFields';
import { updateUserPwd } from '../../store/actions/registration';
import { IRootReducer } from '../../store/reducers';
import { CustomInput } from '../CustomInput';
import { If } from '../If';
import './ChangePassword.scss';
import { schema } from './FormValidation';

export const ChangePassword = () => {
    const {
        user,
        pwdChanged
    } = useSelector((state: IRootReducer) => state.signUp);
    const dispatch = useDispatch();

    return (
        <div className="change_pwd_form container">

            <div className="header_title">
                Edycja hasło
            </div>

            <Formik
                enableReinitialize={true}
                initialValues={user}
                validationSchema={schema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={values => {

                    dispatch(updateUserPwd(values));
                }}
            >
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        {
                            changePasswordFields.map(field =>
                                <div
                                    key={field.id.toString()}
                                    className={field.parentClass}
                                >
                                    <CustomInput
                                        fieldData={field}
                                        formikProps={props}
                                    />
                                </div>
                            )
                        }
                        <If condition={pwdChanged}>
                            <div className="success_message">
                                Hasło zostało zaktualizowane.
                            </div>
                        </If>

                        <button
                            type="submit"
                            className='send'
                        >
                            Zmień hasło
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}