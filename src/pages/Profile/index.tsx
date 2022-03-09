/** @format */

import "./Profile.scss";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { RegistrationForm } from "../../components/RegistrationForm";
import { ChangePassword } from "../../components/ChangePassword";
import { useDispatch } from "react-redux";
// import { getUserData } from '../../store/actions/registration';
import { AddPortfolio } from "../../components/AddPortfolio";
import { getUserData } from "../../store/actions/registration";

export const Profile = () => {
  const dispatch = useDispatch();

  dispatch(getUserData());

  return (
    <>
      <Navbar />
      <AddPortfolio />

      <div className="profile container">
        <div className="header_title">Edycja danych profilowych</div>

        <RegistrationForm />
        <ChangePassword />
        <Footer />
      </div>
    </>
  );
};
