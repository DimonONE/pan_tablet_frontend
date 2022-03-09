/** @format */

import "./RegistrationForm.scss";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory, useRouteMatch } from "react-router";
import { IRootReducer } from "../../store/reducers";
import { userRoutes } from "../../shared/consts/url/routes";
import { CustomInput } from "../CustomInput";
import { signUpSchema, profileSchema } from "./FormValidation";
import { CustomRadioBtn } from "../CustomRadioBtn";
import { ButtonsProfile } from "../ButtonsProfile";
import { FC, useEffect } from "react";
import {
  accountName,
  age,
  confirmPassword,
  email,
  password,
  userTypes,
} from "../../shared/consts/fieldsData/registrationFields";
import { If } from "../If";
import {
  resetErrorMessage,
  updateUserData,
  userSignUp,
} from "../../store/actions/registration";

export const RegistrationForm: FC<{ parent?: string }> = ({ parent }) => {
  const { user, userDataChanged, errorMessage } = useSelector(
    (state: IRootReducer) => state.signUp
  );

  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(resetErrorMessage());
  }, []);

  return (
    <div className="registration_wrapper">
      <div className="registration_header">Rejestracja</div>

      <Formik
        enableReinitialize={true}
        initialValues={user}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={
          path === userRoutes.profile ? profileSchema : signUpSchema
        }
        onSubmit={(values) => {
          if (parent) {
            dispatch(userSignUp(values, history));
            return;
          }
          if (path === userRoutes.profile) {
            dispatch(updateUserData(values));
            return;
          }
          dispatch(userSignUp(values, history));
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div className="account_name_container">
              <CustomInput fieldData={accountName} formikProps={props} />
            </div>

            <div className="age_email_container">
              {[age, email].map((field) => (
                <div key={field.id.toString()} className={field.parentClass}>
                  <CustomInput fieldData={field} formikProps={props} />
                </div>
              ))}
            </div>
            <If condition={path !== userRoutes.profile}>
              <div className="pwds_container">
                {[password, confirmPassword].map((field) => (
                  <div key={field.id.toString()} className={field.parentClass}>
                    <CustomInput fieldData={field} formikProps={props} />
                  </div>
                ))}
              </div>
            </If>
            <div className="type">
              <span>Typ konta:</span>
              <div className="radio">
                {userTypes.map((userType) => (
                  <CustomRadioBtn
                    key={userType.input.id}
                    fieldData={userType}
                    formikProps={props}
                    userRole={user.role}
                  />
                ))}
              </div>
            </div>

            <If condition={Boolean(errorMessage)}>
              <div className="error_message">{errorMessage}</div>
            </If>

            <If condition={userDataChanged}>
              <div className="success_message">
                Konto zostało zaktualizowane.
              </div>
            </If>

            <Route exact path={userRoutes.profile}>
              <ButtonsProfile userId={user && user.id} />
            </Route>

            <If condition={path !== userRoutes.profile}>
              <button type="submit" className="send">
                Utwórz konto
              </button>
            </If>
            <hr />
            <hr />
          </form>
        )}
      </Formik>
    </div>
  );
};
