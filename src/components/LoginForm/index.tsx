import "./LoginForm.scss";
import closeIcon from "../../assets/images/close.png";
import blueLoader from "../../assets/blue_loader.gif";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ForgotForm } from "../ForgotForm";
import { CustomInput } from "../CustomInput";
import { Formik } from "formik";
import { schema } from "./LoginFormValidation";
import { useDispatch, useSelector } from "react-redux";
import { authorization, loginModalClosed } from "../../store/actions/login";
import { ILoginFormData } from "../../store/actions/login/interfaces";
import { IRootReducer } from "../../store/reducers";
import { useHistory } from "react-router";
import { loginFields } from "../../shared/consts/fieldsData/loginFields";
import { FC } from "react";
import { If } from "../If";
import { closeModalWindow } from "../../shared/features/closeModalWindow";

export const LoginForm: FC<{ handleLoginModal: (state: boolean) => void }> = ({
  handleLoginModal,
}) => {
  const { loading, failed } = useSelector((state: IRootReducer) => state.login);

  const dispatch = useDispatch();
  const history = useHistory();
  const [forgotFormOpened, setForgotFormOpened] = useState<boolean>(false);

  const initValues: ILoginFormData = {
    login: "",
    password: "",
  };

  return (
    <>
      <div className="login_box">
        <div
          onClick={() =>
            dispatch(closeModalWindow(loginModalClosed, handleLoginModal))
          }
          className="overlay"
        ></div>

        <div className="login_popup">
          <div className="head">
            <img
              onClick={() =>
                dispatch(closeModalWindow(loginModalClosed, handleLoginModal))
              }
              src={closeIcon}
              alt="no Close icon"
            />
            <h2>Logowanie</h2>
          </div>
          <Formik
            initialValues={initValues}
            validationSchema={schema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(values: ILoginFormData, { setSubmitting }) => {
              dispatch(authorization(values, history, setSubmitting));
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                {loginFields.map((field) => (
                  <CustomInput
                    key={field.id}
                    fieldData={field}
                    formikProps={props}
                  />
                ))}
                <button
                  type="submit"
                  className="btn_login"
                  disabled={props.isSubmitting}
                >
                  <>Zaloguj </>
                  <If condition={loading}>
                    <img src={blueLoader} alt="Loading" />
                  </If>
                </button>
                <If condition={failed}>
                  <div className="error">
                    Hasło lub nazwa użytkownika jest nieprawidłowa
                  </div>
                </If>
              </form>
            )}
          </Formik>
          <div className="forgot_pwd">
            <span onClick={() => setForgotFormOpened(true)}>
              <FontAwesomeIcon icon={faKey} /> Przypomnienie hasła
            </span>
          </div>
        </div>
      </div>
      <If condition={forgotFormOpened}>
        <ForgotForm handleForgotForm={setForgotFormOpened} />
      </If>
    </>
  );
};
