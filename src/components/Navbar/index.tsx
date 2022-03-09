import "./Navbar.scss";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory, useParams } from "react-router-dom";
import { userRoutes } from "../../shared/consts/url/routes";
import { useEffect, useState } from "react";
import { LoginForm } from "../LoginForm";
import docReg from "../../assets/docs/Regulamin.pdf";
import { removeToken } from "../../store/actions/login";
import { useDispatch } from "react-redux";
import { dataFetched } from "../../store/actions/registration";
import { AuthChecking } from "../AuthGuard/AuthChecking";
import {
  faUserPlus,
  faUser,
  faBriefcase,
  faUserCircle,
  faPowerOff,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { If } from "../If";
import { resetWorks } from "../../store/actions/works";

export const Navbar = () => {
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const isAuthorized: boolean = AuthChecking();

  const showBackButton =
    history.location.pathname !== userRoutes.mainPage ||
    history.location.search.includes("?page=0,15&search=") ||
    (history.location.pathname === userRoutes.works &&
      history.location.search.includes("?page=0,15&search="));

  useEffect(() => {
    if (isAuthorized) {
      setLoginModalOpen(false);
    }
  }, [isAuthorized]);

  const logOut = () => {
    dispatch(dataFetched());
    removeToken();
    history.push(`${userRoutes.registration}`);
  };

  const handleFolder = (url: string) => {
    const isAuthorized = AuthChecking();
    if (!isAuthorized) {
      setLoginModalOpen(true);
      return;
    }
    history.push(url);
  };

  const handleProfile = (url: string) => {
    const isAuthorized = AuthChecking();
    if (!isAuthorized) {
      setLoginModalOpen(true);
      return;
    }
    history.push(url);
  };

  const tabsForAuthorized = (
    <>
      <button onClick={() => logOut()}>
        <FontAwesomeIcon icon={faPowerOff} />
        Wyloguj
      </button>
    </>
  );

  const handleReset = () => {
    history.push("/home");
    window.location.reload();
    dispatch(resetWorks());
  };

  const tabsForUnauthorized = (
    <>
      <Link to={userRoutes.registration}>
        <FontAwesomeIcon icon={faUserPlus} /> Rejestracja
      </Link>

      <button onClick={() => setLoginModalOpen(true)}>
        <FontAwesomeIcon icon={faUser} /> Zaloguj
      </button>
    </>
  );

  return (
    <div className="navbar">
      <div
        className={`navbar__content container ${
          showBackButton && `align_right`
        }`}
      >
        <If condition={showBackButton}>
          <button className="move_back" onClick={() => handleReset()}>
            <FontAwesomeIcon icon={faLongArrowAltLeft} /> Na główną
          </button>
        </If>

        <div className="right_side">
          <Link to={userRoutes.randomBooks}>Losowanie ksiąg</Link>

          <button onClick={() => window.open(docReg, "")}>
            <FontAwesomeIcon icon={faFilePdf} /> Regulamin
          </button>
          <If condition={isAuthorized} anotherChildren={tabsForUnauthorized}>
            {tabsForAuthorized}
          </If>

          <button onClick={() => handleFolder(`${userRoutes.folders}`)}>
            <FontAwesomeIcon icon={faBriefcase} /> Teczki
          </button>

          <button onClick={() => handleProfile(`${userRoutes.profile}`)}>
            <FontAwesomeIcon icon={faUserCircle} /> Profil
          </button>
        </div>
      </div>
      <If condition={loginModalOpen}>
        <LoginForm handleLoginModal={() => setLoginModalOpen(false)} />
      </If>
    </div>
  );
};
