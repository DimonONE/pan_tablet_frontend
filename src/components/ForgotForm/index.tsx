import './ForgotForm.scss';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import closeIcon from '../../assets/images/close.png';
import { loginModalClosed, resetPwd } from '../../store/actions/login';
import { IRootReducer } from '../../store/reducers';
import { schema } from './FormValidation';
import blueLoader from '../../assets/blue_loader.gif';
import { CustomInput } from '../CustomInput';
import { FC } from 'react';
import { If } from '../If';
import { closeModalWindow } from '../../shared/features/closeModalWindow';

const forgotPasswordField = {
    placeholder: 'Adres E-mail',
    type: 'email',
    id: 'email',
};

export const ForgotForm: FC<{ handleForgotForm: (state: boolean) => void }> = ({ handleForgotForm }) => {
    const {
        pwdResetSuccess,
        pwdResetFailed,
        loading
    } = useSelector((state: IRootReducer) => state.login);

    const dispatch = useDispatch();

    return (
        <div className="forgot_box">
            <div onClick={() => dispatch(closeModalWindow(loginModalClosed, handleForgotForm))} className="overlay"></div>

            <div className="popup">
                <div className="head">
                    <img onClick={() => dispatch(closeModalWindow(loginModalClosed, handleForgotForm))}
                        src={closeIcon} alt="no Close icon"
                    />
                    <h2>Przypomnienie hasła</h2>
                </div>

                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={schema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={values => {
                        dispatch(resetPwd(values.email));
                    }}
                >
                    {props => (
                        <form onSubmit={props.handleSubmit}>
                            <If condition={pwdResetSuccess}>
                                <div className="success_message">
                                    Nowe hasło zostało wysłane na Twój e-mail
                                </div>
                            </If>

                            <If condition={pwdResetFailed}>
                                <div className="failed_message">
                                    Coś poszło nie tak. Spróbuj ponownie
                                </div>
                            </If>

                            <CustomInput
                                fieldData={forgotPasswordField}
                                formikProps={props}
                            />

                            <button
                                type="submit"
                                className="btn_forgot"
                            >
                                Przypomnij hasło
                                <If condition={loading}>
                                    <img
                                        src={blueLoader}
                                        alt="Loading"
                                    />
                                </If>
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}